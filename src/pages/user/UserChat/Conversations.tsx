import React, { useEffect } from 'react'
import {  ConversationsProps } from '@/services/interface/chat';



const Conversations: React.FC<ConversationsProps> = ({conversations,handleUserClick, senderId,recipientId, isRecipientTyping ,unreadCounts, onlineUsers }) => {
  

 

  return (
    <div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto border-r">
    <h2 className="text-lg  font-bold mb-4">Conversations</h2>
    {Array.isArray(conversations) &&
      conversations ? ( conversations
        .filter(conversation => conversation._id !== senderId) // Filter out the senderId user
        .map((conversation) => (
          <div
            key={conversation._id}
            className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg ${recipientId === conversation._id
              ? 'bg-gray-500 text-white'
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
            <div className='flex flex-col'>
              <span>{conversation.name}</span>
              {isRecipientTyping && recipientId === conversation._id && (
                <div className=" text-green-500 italic">typing...</div>
              )}

            </div>
            {unreadCounts[conversation._id] > 0 && (
              <span className='ml-auto bg-red-500 text-white text-sm rounded-full px-2 py-1'>
                {unreadCounts[conversation._id]}
              </span>
            )}
        { onlineUsers.some(user => user.userId === conversation._id) && (
              <span className={`ml-auto bg-green-500  text-white text-sm rounded-full px-2 py-1`}>
                Online
              </span>
            )}  
          </div>
        ))) :('No conversations found')}
  </div>
  )
}

export default Conversations
