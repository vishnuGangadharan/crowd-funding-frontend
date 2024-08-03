// import { editUserProfile, getUser } from '@/api/user';
// import { userFormData } from '@/services/interface/user';
// import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import {toast}  from 'react-toastify'


// const Dummy :React.FC= () => {

//     const [email,setEmail] = useState<string>('')
//     const [phone, setPhone] = useState<string>('')
//     const [name,setName] = useState<string>('')
//     const [image,setImage] = useState<File | null>(null)
//     const [errors, setErrors] = useState<{[key: string]: string}>({})
//     const [userDetails,setUserDetails] = useState< userFormData | null>({})


//     const { userInfo } = useSelector((state: RootState)=> state.auth) 
//     const userId = userInfo?._id

//     const fetchUser = async () => {
//         try {      
//           const response = await getUser(userId);
//           setUserDetails(response.data);
//           setEmail(response.data.email);
//           setPhone(response.data.phone);
//           setName(response.data.name);
//           setImage(response.data.profilePicture);
//         } catch (error) {
//           console.error("Error fetching fundraisings:", error);
//         }
//       };
    
//       useEffect(() => {
//         fetchUser();
//       }, []); 

//     const handleSubmit =async(e: React.FormEvent)=>{
//         e.preventDefault()

//         const validationErrors : { [key:string]:string} = {};
//         if(!email) validationErrors.email = "Email is required"
//         if(!phone) validationErrors.phone = "phone required"
//         if(phone.length !==10) validationErrors.phone = "phone must be 10 digits"
//         if(!name) validationErrors.name = "name required"
//         if(!/^[a-zA-Z\s]+$/.test(name))validationErrors.name = 'letters only'
//         if(!image) validationErrors.image = "image required"

//         if(Object.keys(validationErrors).length > 0){
//             setErrors(validationErrors)
//             return
//         }

//         const formData = new FormData()
//         formData.append('email',email)
//         formData.append('phone',phone)
//         formData.append('name',name)
//         if (image) {
//             formData.append('profilePicture', image);
//           }
        
//           const response = await editUserProfile(formData as any);
//           if(response){
//             toast.success(response.data.message);

//             console.log("prrrrrrr",response);
            
//           }else{
//             console.log("kittiyilla");
            
//           }

//     }


//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files ? e.target.files[0] : null;
//         setImage(file);
//       };
//     return (
//         <div className='mt-28 flex flex-col'>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <input
//             defaultValue={userDetails?.email}
//               type="email"
//               readOnly
//               placeholder="Email"
//             />
//             {errors.email && <p className='text-red-500'>{errors.email}</p>}
//           </div>
//           <div>
//             <input
//             defaultValue={userDetails?.phone}
//               onChange={(e) => setPhone(e.target.value)}
//               id='phone'
//               type="text"
//               placeholder="Phone"
//             />
//             {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
//           </div>
//           <div>
//             <input
//             defaultValue={userDetails?.name}
//               onChange={(e) => setName(e.target.value)}
//               id='name'
//               type="text"
//               placeholder="Name"
//             />
//             {errors.name && <p className='text-red-500'>{errors.name}</p>}
//           </div>
//           <div>
//             <input
//               type="file"
             
//               onChange={handleFileChange}
//             />
//             {errors.image && <p className='text-red-500'>{errors.image}</p>}
//             <div className='flex flex-wrap mt-2'>
//             {image || userDetails?.profilePicture ? (
//               <img
//                 src={image ? URL.createObjectURL(image) : userDetails?.profilePicture}
//                 alt="Profile Preview"
//                 className="w-20 h-20 object-cover mr-2"
//               />
//             ) : null}
//             </div>
//           </div>
//           <button
//             className='px-4 py-2 bg-green-500 text-white rounded-md'
//             type='submit'
//           >
//             Submit
//           </button>
//         </form>
//       </div>      );
//     };

// export default Dummy

import { editUserProfile, getUser } from '@/api/user';
import { userFormData } from '@/services/interface/user';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Dummy: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userDetails, setUserDetails] = useState<userFormData | null>(null);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userId = userInfo?._id;

  const fetchUser = async () => {
    try {
      const response = await getUser(userId);
      setUserDetails(response.data);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setName(response.data.name);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (!phone) validationErrors.phone = 'Phone is required';
    if (phone.length !== 10) validationErrors.phone = 'Phone must be 10 digits';
    if (!name) validationErrors.name = 'Name is required';
    if (!/^[a-zA-Z\s]+$/.test(name)) validationErrors.name = 'Name must contain only letters';
    if (!image && !userDetails?.profilePicture) validationErrors.image = 'Image is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', name);
    if (image) {
      formData.append('profilePicture', image);
    }

    try {
      const response = await editUserProfile(formData as any);
      if (response) {
        console.log('Profile updated successfully', response);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

  };

  return (
    <div className="mt-28 flex flex-col">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            readOnly
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            type="text"
            placeholder="Phone"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
          <div className="flex flex-wrap mt-2">
            {image || userDetails?.profilePicture ? (
              <img
                src={image ? URL.createObjectURL(image) : userDetails?.profilePicture}
                alt="Profile Preview"
                className="w-20 h-20 object-cover mr-2"
              />
            ) : null}
          </div>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dummy;

