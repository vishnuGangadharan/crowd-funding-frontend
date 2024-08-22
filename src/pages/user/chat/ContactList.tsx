import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { allUsersChatted, getMessage, sendMessages } from '../../api/chat';

const socket = io('http://localhost:3008');

interface Message {
  senderId: string | null;
  recipientId: string;
  message: string;
  messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
  fileUrl: string; // Make sure this is nullable or empty string initially
}

interface Conversation {
  recipientId: string;
  name: string;
  _id: string;
  profilePicture: string;
}

const Chat: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');
  const [currentUserId, setCurrentUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (senderId) setCurrentUserId(senderId);
    if (receiverId) setRecipientId(receiverId);
  }, [senderId, receiverId]);

  useEffect(() => {
    if (currentUserId && recipientId) {
      // Joining the chat room with both user IDs
      socket.emit('joinRoom', { userId: currentUserId, recipientId });

      // Listening for incoming messages
      socket.on('receiveMessage', (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Cleanup on unmount or when user changes
      return () => {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
        socket.off('receiveMessage');
      };
    }
  }, [currentUserId, recipientId]);

  const sendMessage = async () => {
    if (message.trim() === '' && !file) return;

    let messageType: Message['messageType'] = 'text'; // Default messageType
    let fileUrl = ''; // Initialize fileUrl as an empty string

    // If there is a file, determine the file type and set messageType accordingly
    if (file) {
      const fileType = file.type.split('/')[0];
      if (fileType === 'image') {
        messageType = 'image';
      } else if (fileType === 'video') {
        messageType = 'video';
      } else if (fileType === 'audio') {
        messageType = 'audio';
      } else {
        messageType = 'file';
      }
    }

    const newMessage = {
      senderId: currentUserId,
      recipientId: recipientId,
      message: message || '', // Send the message text or an empty string
      messageType,
      fileUrl: fileUrl
    };

    // Emit the message through socket
    socket.emit('sendMessage', newMessage);

    const formData = new FormData();
    formData.append('senderId', currentUserId);
    formData.append('recipientId', recipientId);
    formData.append('message', message || '');
    formData.append('messageType', messageType);

    // Append the file if it exists
    if (file) {
      formData.append('file', file);
    }

    // Send the message data (including file if any) to the backend
    const response = await sendMessages(formData);

    // const uploadedFileUrl = response.data.fileUrl; // Assuming the backend returns the file URL

    // // Update the fileUrl in the message
    // const updatedMessage = { ...newMessage, fileUrl: uploadedFileUrl };

    // // Manually update the message list with the file's URL
    // setMessages((prevMessages) => [...prevMessages, updatedMessage]);

    // Clear the input fields after sending the message
    setMessage('');
    setFile(null); // Clear file input after sending the message
  };


  useEffect(() => {
    const allUsers = async () => {
      try {
        const response = await allUsersChatted(senderId as string);
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

  return (
    <div className="flex max-w-5xl mx-auto h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto border-r">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {Array.isArray(conversations) &&
          conversations
            .filter((conversation) => conversation._id !== senderId) // Filter out the senderId user
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
                alignSelf:
                  msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.messageType === 'text' ? (
                msg.message
              ) : (
                <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                  {msg.messageType === 'image' && (
                    <img src={msg.fileUrl} alt="sent file" />
                  )}
                  {msg.messageType === 'video' && (
                    <video controls src={msg.fileUrl} />
                  )}
                  {msg.messageType === 'audio' && (
                    <audio controls src={msg.fileUrl} />
                  )}
                  {msg.messageType === 'file' && (
                    <span>{msg.fileUrl.split('/').pop()}</span>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        {/* Message Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 bg-gray-100 flex"
        >
          {file ? (
            <div className="flex items-center bg-gray-300 p-2 rounded-l-lg border border-gray-300">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-16 h-16 object-cover mr-2"
                />
              ) : file.type.startsWith('video/') ? (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-16 h-16 mr-2"
                  controls
                />
              ) : (
                <span>{file.name}</span> // Display the file name for non-image/video files
              )}
              <button
                type="button"
                className="text-red-500 hover:text-red-700 ml-2"
                onClick={() => setFile(null)} // Clear the file selection
              >
                ✕
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFile(null); // Clear the file selection if the user types a message
              }}
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
            />
          )}
          <button
            type="button"
            className="p-2 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400"
            onClick={() => document.getElementById('fileInput')?.click()}
            disabled={message.trim() !== ''} // Disable file selection if the user has typed a message
          >
            📎
          </button>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setMessage(''); // Clear the message input if the user selects a file
              }
            }}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
