

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



import React, { useState } from 'react';
import axios from 'axios';

const Dummy: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="cursor-pointer">
        {image ? (
          <img src={image} alt="Selected" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>
      {file && (
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload Image
        </button>
      )}
    </div>
  );
};

export default Dummy;
