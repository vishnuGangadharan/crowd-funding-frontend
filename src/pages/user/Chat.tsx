import React, { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Chat = () => {
  const socket = useMemo(() => io('http://localhost:3008'), []);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [socketId, setSocketId] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (room) {
      socket.emit('message', { room, message });
      setMessage('');
    } else {
      console.error("Room is required");
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      if (socket.id) {
        setSocketId(socket.id);
        console.log('Connected:', socket.id);
      }
    });

    socket.on('receive-message', (data) => {
      console.log('Received message:', data);
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect(); // Clean up the connection on component unmount
    };
  }, [socket]);

  // Function to join a room
  const handleJoinRoom = () => {
    if (room) {
      socket.emit('join-room', room);
      console.log(`Joined room: ${room}`);
    } else {
      console.error("Room is required to join");
    }
  };

  return (
    <div className=''>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Socket ID: {socketId}
        </div>
        <input
          value={message}
          placeholder='message'
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          value={room}
          placeholder='room'
          type="text"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className='border-r-orange-300 bg-red-300' type='button' onClick={handleJoinRoom}>
          Join Room
        </button>
        <button className='border-r-orange-300 bg-red-300' type='submit'>
          Send Message
        </button>
      </form>

      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
