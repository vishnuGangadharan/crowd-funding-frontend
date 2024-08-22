
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { allUsersChatted, getMessage, sendMessages } from '../../api/chat';

const socket = io('http://localhost:3008');

interface Message {
  senderId: string | null;
  recipientId: string;
  message: string;
}

interface Conversation {
  recipientId: string;
  name: string;
  _id: string;
  profilePicture: string
}

const Chat: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');
  const [currentUserId, setCurrentUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (senderId) setCurrentUserId(senderId);
    if (receiverId) setRecipientId(receiverId);
  }, [senderId, receiverId]);

  useEffect(() => {
    if (currentUserId && recipientId) {
      socket.emit('joinRoom', { userId: currentUserId, recipientId });

      socket.on('receiveMessage', (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
        socket.off('receiveMessage');
      };
    }
  }, [currentUserId, recipientId]);

  const sendMessage = async () => {
    if (!message) return;

    const newMessage = {
      senderId: currentUserId,
      recipientId: recipientId,
      message: URL.createObjectURL(message),
    };

    socket.emit('sendMessage', newMessage);
    // const response = await sendMessages(newMessage);
    setMessage(null);
  };

  useEffect(() => {
    const allUsers = async () => {
      try {
        const response = await allUsersChatted(senderId as string);
        console.log("sdsdsa", response.data);

        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if (senderId) {
      allUsers();
    }
  }, [senderId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessage(currentUserId, recipientId);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUserId && recipientId) {
      fetchMessages();
    }
  }, [currentUserId, recipientId]);

  const handleUserClick = (id: string) => {
    setRecipientId(id);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMessage(() => file as any);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto border-r">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {Array.isArray(conversations) &&
          conversations
            .filter(conversation => conversation._id !== senderId) // Filter out the senderId user
            .map((conversation) => (
              <div
                key={conversation._id}
                className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg ${recipientId === conversation._id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100'
                  }`}
                onClick={() => handleUserClick(conversation._id)}
              >
                {/* Profile Picture */}
                <img
                  src={conversation.profilePicture}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full mr-3" // Circular shape and margin-right
                />
                {/* User Name */}
                <span>{conversation.name}</span>
              </div>
            ))}
      </div>


      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-gray-200">
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 max-w-sm rounded-lg shadow-md ${msg.senderId === currentUserId
                  ? 'bg-blue-500 text-white self-end ml-[40%]'
                  : 'bg-white text-gray-800 self-start'
                }`}
              style={{
                alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              <img src={ msg.message}alt="" />
              
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 bg-gray-100 flex"
        >
          <input
            type="file"
            onChange={handleFileChange}            placeholder="Type your message..."            className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default Chat;
