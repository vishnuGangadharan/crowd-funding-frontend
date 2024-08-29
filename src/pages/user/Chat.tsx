import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { allUsersChatted, getMessage, sendMessages } from '../../api/chat';
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { TbBookUpload } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";


const socket = io('http://localhost:3008');

interface Message {
  senderId: string | null;
  recipientId: string;
  message?: string;
  mediaUrl?: string;  // Optional field for file URL or base64 data
  messageType?: string; // Optional field for file type
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [file, setFile] = useState<File | null>(null); // State to handle file upload
  const [filePreview, setFilePreview] = useState<string | null>(null); // State to handle file preview
  const [showPicker, setShowPicker] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});


  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

   useEffect(() => {
    if (senderId) setCurrentUserId(senderId);
    if (receiverId) setRecipientId(receiverId);
  }, [senderId, receiverId]);

  useEffect(() => {
    if (currentUserId && recipientId) {
      socket.emit('joinRoom', { userId: currentUserId, recipientId });

      socket.on('receiveMessage', (newMessage: Message) => {
        if
        ((newMessage.senderId === currentUserId && newMessage.recipientId === recipientId)||
          (newMessage.senderId === recipientId && newMessage.recipientId === currentUserId)
        ){
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
        socket.off('receiveMessage');
      };
    }
  }, [currentUserId, recipientId]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string); // Set base64 string as preview
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === '' && !file) return;

    const newMessage: Message = {
      senderId: currentUserId,
      recipientId: recipientId,
      message: message,
    };

    const formData = new FormData();
    formData.append('senderId', currentUserId as string);
    formData.append('recipientId', recipientId as string);
    formData.append('message', message);

    if (file && filePreview) {
      formData.append('fileUrl', file);
      formData.append('fileType', file.type.split('/')[0]);
      newMessage.messageType = file.type.split('/')[0]; // Extract file type (e.g., 'image', 'video', etc.)
      newMessage.mediaUrl = filePreview;
    }

    // Emit the message and file to the server
    socket.emit('sendMessage', newMessage);
    await sendMessages(formData); // Send the FormData to the backend
    setMessage('');
    setFile(null); // Clear the selected file after sending
    setFilePreview(null); // Clear the file preview after sending
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
    socket.emit('markMessagesAsRead', { recipientId: currentUserId, senderId: id });
    setMessages([]);
  };

  const onEmojiClick = (emojiObject: any) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
  };



  const handleAudioRecordingComplete = async (blob: Blob) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Audio = reader.result as string;

      const formData = new FormData();
      formData.append('senderId', currentUserId as string);
      formData.append('recipientId', recipientId as string);
      formData.append('fileUrl', blob, 'audio.webm');
      formData.append('fileType', 'audio');

      const newMessage: Message = {
        senderId: currentUserId,
        recipientId: recipientId,
        // message: 'Audio message',
        mediaUrl: base64Audio,
        messageType: 'audio',
      };

      socket.emit('sendMessage', newMessage);
      await sendMessages(formData);

    };

    reader.readAsDataURL(blob);
  };


  useEffect(() => {
    socket.on('updateUnreadCount', ({ senderId, unreadCount }) => {
      setUnreadCounts(prevCounts => ({
        ...prevCounts,
        [senderId]: unreadCount,
      }));
    });

    return () => {
      socket.off('updateUnreadCount');
    };
  }, []);

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
                {unreadCounts[conversation._id] > 0 && (
                  <span className='ml-auto bg-red-500 text-white text-sm rounded-full px-2 py-1'>
                    {unreadCounts[conversation._id]}
                  </span>
                )}
              </div>
            ))}
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-gray-200">
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null} 
              className={`mb-3 p-3 max-w-sm rounded-lg shadow-md ${msg.senderId === currentUserId
                ? 'bg-blue-500 text-white self-end ml-[40%]'
                : 'bg-white text-gray-800 self-start'
                }`}
              style={{
                alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.message}
              {/* Display file preview if a file is part of the message */}
              {msg.mediaUrl && (
                <div className="mt-2">
                  {msg.messageType === 'image' ? (
                    <img src={msg.mediaUrl} alt="Sent file" className="max-w-full max-h-40 rounded-lg" />
                  ) : msg.messageType === 'video' ? (
                    <video controls className="max-w-full max-h-40 rounded-lg">
                      <source src={msg.mediaUrl} type="video/mp4" />
                    </video>
                  ) : msg.messageType === 'audio' ? (
                    <audio controls className="w-full">
                      <source src={msg.mediaUrl} type="audio/mpeg" />
                    </audio>
                  ) : (
                    <a href={msg.mediaUrl} download className="text-blue-500">
                      Download File
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* File preview section */}
        {filePreview && file &&(
          <div className="relative p-4">
            <div className="bg-gray-300 p-4 rounded-lg flex relative">
              <div className="relative">
                {file?.type.startsWith('image') ? (
                  <img src={filePreview} alt="Preview" className="max-w-full max-h-40 rounded-lg" />
                ) : file?.type.startsWith('video') ? (
                  <video controls className="max-w-full max-h-40 rounded-lg">
                    <source src={filePreview} type="video/mp4" />
                  </video>
                ) : (
                  ''
                )}
                {file && 
                
                <div className="absolute top-0 right-0 text-red-500 text-xl"><MdDeleteForever onClick={()=> setFile(null)}/></div>
                }
              </div>
            </div>
          </div>
        )}

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className="flex items-center p-4 bg-gray-300 border-t">
            <div className="relative">
              <BsEmojiSmile
                className="text-2xl cursor-pointer text-gray-500"
                onClick={() => setShowPicker((val) => !val)}
              />
              {showPicker && (
                <div className="absolute bottom-12 left-0 z-10">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>

            {/* Message input */}
            <input
              type="text"
              placeholder="Type a message"
              className="flex-grow bg-white p-2 rounded-full mx-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* File input */}
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className='w-11'>
              <TbBookUpload size={40} />
            </label>

            {/* Send button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full"
            >
              Send
            </button>
          </div>
        </form>


        {/* Audio Recorder */}
        <div className="p-4 bg-gray-300 border-t">
          <AudioRecorder
            onRecordingComplete={handleAudioRecordingComplete}
            audioTrackConstraints={{
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;