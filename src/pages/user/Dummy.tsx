

// import { editUserProfile, getUser } from '@/api/user';
// import { userFormData } from '@/services/interface/user';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

// const Dummy: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [phone, setPhone] = useState<string>('');
//   const [name, setName] = useState<string>('');
//   const [image, setImage] = useState<File | null>(null);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [userDetails, setUserDetails] = useState<userFormData | null>(null);

//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const userId = userInfo?._id;

//   const fetchUser = async () => {
//     try {
//       const response = await getUser(userId);
//       setUserDetails(response.data);
//       setEmail(response.data.email);
//       setPhone(response.data.phone);
//       setName(response.data.name);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationErrors: { [key: string]: string } = {};
//     if (!phone) validationErrors.phone = 'Phone is required';
//     if (phone.length !== 10) validationErrors.phone = 'Phone must be 10 digits';
//     if (!name) validationErrors.name = 'Name is required';
//     if (!/^[a-zA-Z\s]+$/.test(name)) validationErrors.name = 'Name must contain only letters';
//     if (!image && !userDetails?.profilePicture) validationErrors.image = 'Image is required';

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('name', name);
//     if (image) {
//       formData.append('profilePicture', image);
//     }

//     try {
//       const response = await editUserProfile(formData as any);
//       if (response) {
//         console.log('Profile updated successfully', response);
//       } else {
//         console.error('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setImage(file);

//   };

//   return (
//     <div className="mt-28 flex flex-col">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             readOnly
//             placeholder="Email"
//           />
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </div>
//         <div>
//           <input
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             id="phone"
//             type="text"
//             placeholder="Phone"
//           />
//           {errors.phone && <p className="text-red-500">{errors.phone}</p>}
//         </div>
//         <div>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             id="name"
//             type="text"
//             placeholder="Name"
//           />
//           {errors.name && <p className="text-red-500">{errors.name}</p>}
//         </div>
//         <div>
//           <input type="file" onChange={handleFileChange} />
//           {errors.image && <p className="text-red-500">{errors.image}</p>}
//           <div className="flex flex-wrap mt-2">
//             {image || userDetails?.profilePicture ? (
//               <img
//                 src={image ? URL.createObjectURL(image) : userDetails?.profilePicture}
//                 alt="Profile Preview"
//                 className="w-20 h-20 object-cover mr-2"
//               />
//             ) : null}
//           </div>
//         </div>
//         <button className="px-4 py-2 bg-green-500 text-white rounded-md" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Dummy;

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:3008');

interface Message {
  senderId: string | null;
  recipientId: string;
  message: string;
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

  return (
    <div className="flex flex-col max-w-md mx-auto h-screen bg-gray-100">
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
  );
};

export default Chat;
