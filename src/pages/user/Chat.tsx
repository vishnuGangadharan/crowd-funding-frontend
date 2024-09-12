import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { allUsersChatted, getMessage, lastSeenStatus, sendMessages } from '../../api/chat';
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { TbBookUpload } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Conversations from './UserChat/Conversations';
import ShowChats from './UserChat/ShowChats';
import { Message , Conversation, onlineUser } from '@/services/interface/chat';
import { lastSeenProps } from '@/services/interface/chat';
const socket = io(import.meta.env.VITE_API_URL);
//'http://localhost:3008'  ,import.meta.env.VITE_API_URL


const Chat: React.FC = () => {
  const location = useLocation();
  const { senderId, receiverId } = location.state || {};

  const [currentUserId, setCurrentUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<onlineUser[]>([]);
  const [lastSeenUser, setLastSeenUser] = useState<lastSeenProps[]>([]);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (socket == null || !currentUserId) return;
  
    socket.emit('addNewUser', currentUserId);
      socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    });
  
    return () => {
      socket.off('getOnlineUsers');
    };
  }, [currentUserId, socket]);
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit('userLeftChat', currentUserId);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      let time = new Date()
      socket.emit('userLeftChat', currentUserId,time);  // Handle navigation away from the chat
      console.log('user out.....',currentUserId);
      
    };
  }, [socket, currentUserId]);
  

  const fetchLastSeen = async () => {
    const response = await lastSeenStatus();
    setLastSeenUser(response.data);
    console.log('response', response.data);
  };

  useEffect(() => {
    fetchLastSeen();
    socket.on('userLastSeen', ({userId, lastSeen}) => {
      setLastSeenUser((prev) => 
      prev.map((user) => 
      user._id == userId ? {...user,lastSeen} : user
    )
      )
    })
  }, [currentUserId, recipientId]);


  useEffect(() => {
    if (senderId) setCurrentUserId(senderId);
    if (receiverId) setRecipientId(receiverId);
  }, [senderId, receiverId]);

  useEffect(() => {
    if (currentUserId && recipientId) {
      socket.emit('joinRoom', { userId: currentUserId, recipientId });
  
      socket.on('receiveMessage', (newMessage: Message) => {
        console.log('Received message:', newMessage);
        if (
          (newMessage.senderId === currentUserId && newMessage.recipientId === recipientId) ||
          (newMessage.senderId === recipientId && newMessage.recipientId === currentUserId)
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });
  
      const handleBeforeUnload = () => {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
      };
        window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
        socket.off('receiveMessage');
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [currentUserId, recipientId]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        socket.emit('leaveRoom', { userId: currentUserId, recipientId });
      } else if (document.visibilityState === 'visible') {
        socket.emit('joinRoom', { userId: currentUserId, recipientId });
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit('typing', { senderId: currentUserId, recipientId });
      setIsTyping(true);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { senderId: currentUserId, recipientId });
      setIsTyping(false);
    }, 1000);
  };


  useEffect(() => {
    socket.on('typing', ({ senderId }) => {
      if (senderId === recipientId) {

        setIsRecipientTyping(true);
      }
    });

    socket.on('stopTyping', ({ senderId }) => {
      if (senderId === recipientId) {

        setIsRecipientTyping(false);
      }
    });

    return () => {
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [recipientId]);


  const sendMessage = async () => {
    if (message.trim() === '' && !file) return;

    const newMessage: Message = {
      senderId: currentUserId,
      recipientId: recipientId,
      message: message,
      createdAt: new Date()
    };

    const formData = new FormData();
    formData.append('senderId', currentUserId as string);
    formData.append('recipientId', recipientId as string);
    formData.append('message', message);

    if (file && filePreview) {
      formData.append('fileUrl', file);
      formData.append('fileType', file.type.split('/')[0]);
      newMessage.messageType = file.type.split('/')[0]; 
      newMessage.mediaUrl = filePreview;
    }


    socket.emit('sendMessage', newMessage);
    await sendMessages(formData);
    setMessage('');
    setFile(null);
    setFilePreview(null);
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
  }, [senderId, message]);

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
    setMessage('')
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
        createdAt: new Date()
      };

      socket.emit('sendMessage', newMessage);
      await sendMessages(formData);

    };

    reader.readAsDataURL(blob);
  };

 


  useEffect(() => {

    socket.on('updateUnreadCount', ({ senderId, unreadCount }) => {
      console.log('Received updateUnreadCount:', senderId, unreadCount);

      setUnreadCounts(prevCounts => ({
        ...prevCounts,
        [senderId]: unreadCount,
      }));
    });

    return () => {
      socket.off('updateUnreadCount');
    };
  }, []);


    if (unreadCounts[recipientId]) {
      setUnreadCounts((prevUnreadCounts) => ({
        ...prevUnreadCounts,
        [recipientId]: 0,
      }));
    }
 
  

  return (
    <div className="flex max-w-5xl mx-auto h-screen bg-gray-100">

      {/* left window */}
      <Conversations conversations={conversations} onlineUsers={onlineUsers} handleUserClick={handleUserClick} senderId={senderId} recipientId={recipientId} isRecipientTyping={isRecipientTyping} unreadCounts={unreadCounts}  />

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-gray-200">

        <ShowChats conversations={conversations} recipientId={recipientId} messages={messages} currentUserId={currentUserId}  onlineUsers={onlineUsers} lastSeenUser={lastSeenUser}/>

        {/* File preview section */}
        {filePreview && file && (
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

                  <div className="absolute top-0 right-0 text-red-500 text-xl"><MdDeleteForever onClick={() => setFile(null)} /></div>
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

            <input
              type="text"
              placeholder="Type a message"
              className="flex-grow bg-white p-2 rounded-full mx-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className='w-11'>
              <TbBookUpload size={40} />
            </label>

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