import React, { useEffect, useRef, useState } from 'react'
import { timeGet } from '@/services/functions/Functions';
import { chatProps, lastSeenProps } from '@/services/interface/chat';
import { lastSeenStatus } from '@/api/chat';
import { formatTimeInIST } from '@/services/functions/Functions';
const ShowChats: React.FC<chatProps> = ({ conversations, recipientId, messages, currentUserId, onlineUsers , lastSeenUser}) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  // const [lastSeenUser, setLastSeenUser] = useState<lastSeenProps[]>([]);

  // const fetchLastSeen = async () => {
  //   const response = await lastSeenStatus();
  //   setLastSeenUser(response.data);
  //   console.log('response', response.data);
  // };

  // useEffect(() => {
  //   fetchLastSeen();
  // }, []);
  console.log('lastSeenUser.......', lastSeenUser);
  

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className='w-full py-3 bg-white-smoke'>
        {Array.isArray(conversations) && conversations.map((item, index) => {
          const isOnline = onlineUsers?.some(user => user.userId === item._id);
          const lastSeenTime = lastSeenUser?.find(user => user._id === item._id)?.lastSeen;

          return (
            <div key={index}>
              {item._id == recipientId && (
                <div className='flex text-center text-gray-500'>
                  <img src={item.profilePicture} className='w-12 h-12 rounded-full ml-5' alt="" />
                  <span className='ml-3 mt-3 font-semibold'> {item.name}</span>

                  <span className='ml-3 mt-3'>
                    {isOnline ? (
                      ''
                    ) : lastSeenTime ? (
                      `Last seen: ${formatTimeInIST(lastSeenTime)}`
                    ) : (
                      'offline'
                    )}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages ? (
          messages.map((msg, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`mb-3 p-3 max-w-sm rounded-lg shadow-md relative ${msg.senderId === currentUserId
                ? 'bg-blue-500 text-white self-end ml-[40%]'
                : 'bg-white text-gray-800 self-start'
                }`}
              style={{
                alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.message}
              <span className='absolute right-2 bottom-2 text-xs text-gray-300'>{timeGet(msg.createdAt)}</span>

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
          ))
        ) : (
          'No Messages'
        )}
      </div>
    </>
  );
};

export default ShowChats;
