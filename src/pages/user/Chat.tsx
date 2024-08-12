


// import React, { useEffect, useMemo, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useLocation } from 'react-router-dom';
// import { getMessage, sendMessage } from '@/api/chat';
// import { chatInterface } from '@/services/interface/interface';
// import { user } from '@nextui-org/react';

// const ChatApp: React.FC = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const senderId = searchParams.get('senderId');
//   const receiverId = searchParams.get('receiverId');

//   const socket: Socket = useMemo(() => io('http://localhost:3008'), []);
//   const [message, setMessage] = useState<string>('');
//   const [receivedMessages, setReceivedMessages] = useState<chatInterface[]>([])
//   const [contacts, setContacts] = useState<string[] >([]);

//   useEffect(() => {
//     const userIds: (string | null)[] = [senderId, receiverId];
//     socket.emit('join-room', userIds);

//     socket.on('connect', () => {
//       console.log('Connected:', socket.id);
//     });

//     socket.on('receive-message', (data: { from: string; text: string }) => {
//       console.log('Received message:', data);
//       setReceivedMessages((prev) => [
//         ...prev,
//     ]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket, senderId, receiverId]);

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const userIds: string[] = [];
//     if (senderId) userIds.push(senderId);
//     if (receiverId) userIds.push(receiverId);

//     if (message.trim()) {
//       const payload: chatInterface = {
//         senderId: senderId || '',
//         receiverId: receiverId || '',
//         message: message,
//       };

//       try {
//         const response = await sendMessage(payload);
//         console.log('Message sent, response:', response);

//         socket.emit('message', { userIds, message });
//         setReceivedMessages((prev) => [
//           ...prev,
//         ]);
//         setMessage('');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };


//   useEffect(()=>{
//     const userIds: (string | null)[] = [senderId, receiverId];
//     socket.emit('join-room',userIds)
//     const fetchMessages = async () => {
//       try {
//         const response = await getMessage(senderId, receiverId);
//         console.log("get", response.data);
//         setReceivedMessages(response.data);

//         const uniqueContacts = Array.from(new Set(response.data.map((msg: chatInterface) =>
//           msg.senderId !== senderId ? msg.senderId : msg.receiverId
//         ))) as string[];
//         setContacts(uniqueContacts);
//       } catch (error) {
//         console.log("error in fetching message", error);
//       }
//     }

//     fetchMessages()
//   },[senderId,receiverId])

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left Sidebar for Contact List */}
//       <div className="w-1/3 bg-white border-r border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-semibold">Chats</h1>
//         </div>
//         <ul className="overflow-y-auto h-[calc(100vh-4rem)]">
//           {contacts.map((contact, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 // Implement logic to change the current chat based on selected contact
//               }}
//               className={`flex items-center p-4 cursor-pointer hover:bg-gray-50`}
//             >
//               <div className="ml-3">
//                 <p className="text-sm font-semibold">{contact}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right Side for Chat Window */}
//       <div className="flex flex-col justify-between w-2/3 h-screen">
//         {receiverId ? (
//           <>
//             <div className="p-4 border-b border-gray-200 bg-white">
//               <h2 className="text-lg font-semibold">{receiverId}</h2>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//               {receivedMessages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-4 ${msg.senderId === senderId ? 'text-right' : ''}`}
//                 >
//                   <div
//                     className={`inline-block p-2 rounded-lg ${
//                       msg.receiverId === receiverId
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-900'
//                     }`}
//                   >
//                     {msg.message}
//                   </div>
//                   <p className="mt-1 text-xs text-gray-500">{msg.createdAt instanceof Date ? msg.createdAt.toLocaleString() : msg.createdAt}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 bg-white border-t border-gray-200">
//               <form className="flex" onSubmit={handleSendMessage}>
//                 <input
//                   value={message}
//                   placeholder="Type your message"
//                   type="text"
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center w-full text-gray-500">
//             Select a contact to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatApp;



import React, { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { getMessage, sendMessage } from '@/api/chat';
import { chatInterface } from '@/services/interface/interface';

const ChatApp: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');

  const socket: Socket = useMemo(() => io('http://localhost:3008'), []);
  const [message, setMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<chatInterface[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);

  useEffect(() => {
    const userIds: (string | null)[] = [senderId, receiverId];
    socket.emit('join-room', userIds);

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
    });

    socket.on('receive-message', (data: { from: string; text: string }) => {
      console.log('Received message:', data);
      setReceivedMessages((prev) => [
        ...prev,
        {
          senderId: data.from,
          receiverId: receiverId || '',
          message: data.text,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, senderId, receiverId]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userIds: string[] = [];
    if (senderId) userIds.push(senderId);
    if (receiverId) userIds.push(receiverId);

    if (message.trim()) {
      const payload: chatInterface = {
        senderId: senderId || '',
        receiverId: receiverId || '',
        message: message,
      };

      try {
        const response = await sendMessage(payload);
        console.log('Message sent, response:', response);

        socket.emit('message', { userIds, message });
        setReceivedMessages((prev) => [
          ...prev,
          payload, // Immediately add the message to the UI
        ]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessage(senderId, receiverId);
        console.log('get', response.data);
        setReceivedMessages(response.data);

        const uniqueContacts = Array.from(
          new Set(
            response.data.map((msg: chatInterface) =>
              msg.senderId !== senderId ? msg.senderId : msg.receiverId
            )
          )
        ) as string[];
        setContacts(uniqueContacts);
      } catch (error) {
        console.log('error in fetching message', error);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar for Contact List */}
      <div className="w-1/3 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
        <ul className="overflow-y-auto h-[calc(100vh-4rem)]">
          {contacts.map((contact, index) => (
            <li
              key={index}
              onClick={() => {
                // Implement logic to change the current chat based on selected contact
              }}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50`}
            >
              <div className="ml-3">
                <p className="text-sm font-semibold">{contact}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side for Chat Window */}
      <div className="flex flex-col justify-between w-2/3 h-screen">
        {receiverId ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold">{receiverId}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {receivedMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.senderId === senderId ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId === senderId
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {msg.message}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {msg.createdAt instanceof Date
                      ? msg.createdAt.toLocaleString()
                      : msg.createdAt}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
              <form className="flex" onSubmit={handleSendMessage}>
                <input
                  value={message}
                  placeholder="Type your message"
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;

