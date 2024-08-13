import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { allUsersChatted, getMessage } from '../../api/chat';

const socket = io('http://localhost:3008');

interface Message {
  senderId: string | null;
  recipientId: string;
  message: string;
}

interface Conversation {
  recipientId: string;
  recipientName: string;
}

const Chat: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');
  const [currentUserId, setCurrentUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
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
        socket.off('receiveMessage'); 
        socket.disconnect();
      };
    }
  }, [currentUserId, recipientId]);

  const sendMessage = () => {
    if (message.trim() === '') return;
  
    const newMessage = {
      senderId: currentUserId,
      recipientId: recipientId,
      message: message,
    };
  
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };
  

  //chatted users
  useEffect(() => {
    const allUsers = async() =>{
      const response = await allUsersChatted(senderId as string)
      console.log("ffffff",response);
      
    }
    allUsers()
  },[senderId])



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessage(senderId, recipientId);
        setMessages(response.data); // Set the fetched messages
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUserId && recipientId) {
      fetchMessages();
    }
  }, [currentUserId, recipientId]);

  return (
    <div className="flex max-w-5xl mx-auto h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {Array.isArray(conversations) && conversations.map((conversation, index) => (
          <div
            key={index}
            className="p-2 mb-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg"
            onClick={() => setRecipientId(conversation.recipientId)}
          >
            {conversation.recipientName}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow p-4 overflow-y-auto bg-white shadow-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.senderId === currentUserId
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gray-100 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
