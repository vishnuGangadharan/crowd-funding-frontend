// import React, { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { FaEdit, FaWallet } from 'react-icons/fa';
// import { BsChatDots } from 'react-icons/bs';
// import { editUserProfile } from '../api/user';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { useNavigate } from 'react-router-dom';

// const formSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().refine(value => /^\d{10}$/.test(value), {
//     message: "Phone number must be exactly 10 digits long",
//   }),
//   currentPassword: z.string().optional(),
//   newPassword: z.string().optional(),
//   confirmPassword: z.string().optional(),
//   profilePicture: z.any().optional(),
// }).superRefine((data, ctx) => {
//   const passwordFields = [data.currentPassword, data.newPassword, data.confirmPassword];

//   const isPasswordFieldFilled = passwordFields.some(field => field !== undefined && field !== "");

//   if (isPasswordFieldFilled) {
//     if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "All password fields must be filled",
//         path: ["currentPassword", "newPassword", "confirmPassword"].filter(key => !(key in data) || !data[key as keyof typeof data])
//       });
//     }

//     if (data.currentPassword && data.currentPassword.length < 7) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Password should be at least 7 characters",
//         path: ["currentPassword"],
//       });
//     }

//     if (data.newPassword) {
//       if (data.newPassword.length < 7) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Password should be at least 7 characters",
//           path: ["newPassword"],
//         });
//       }
//       if (!/[a-zA-Z]/.test(data.newPassword)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Password must contain letters.",
//           path: ["newPassword"],
//         });
//       }
//       if (!/\d/.test(data.newPassword)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Password must contain numbers.",
//           path: ["newPassword"],
//         });
//       }
//       if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Password must contain special characters.",
//           path: ["newPassword"],
//         });
//       }
//       if (data.confirmPassword !== data.newPassword) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Passwords don't match",
//           path: ["confirmPassword"],
//         });
//       }
//     }
//   }
// });

// interface FormValues {
//   name: string;
//   email: string;
//   phone: string;
//   currentPassword: string | undefined;
//   newPassword: string | undefined;
//   confirmPassword: string | undefined;
//   profilePicture: File | string;
// }

// const Profile: React.FC = () => {
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: userInfo?.name,
//       email: userInfo?.email,
//       phone: userInfo?.phone,
//       currentPassword: '',
//       confirmPassword: '',
//       newPassword: '',
//       profilePicture: '',
//     },
//     mode: "onTouched"
//   });

//   const [isEditable, setIsEditable] = useState(false);
//   const [profilePicturePreview, setProfilePicturePreview] = useState('./User/5240.jpg');

//   const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setValue("profilePicture", file);
//       const reader = new FileReader();
//       reader.onload = () => setProfilePicturePreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('email', data.email);
//     formData.append('phone', data.phone);
//     formData.append('currentPassword', data.currentPassword || '');
//     formData.append('newPassword', data.newPassword || '');
//     formData.append('confirmPassword', data.confirmPassword || '');
//     if (data.profilePicture instanceof File) {
//       formData.append('profilePicture', data.profilePicture);
//     }

//     // Convert FormData to an object for logging
//     const formDataObj: any = {};
//     formData.forEach((value, key) => {
//       formDataObj[key] = value;
//     });

//     // Log the data that will be sent to the backend
//     console.log("Data to be sent to backend:", formDataObj);

//     try {
//       const response = await editUserProfile(formData);
//       // Handle form submission logic here (e.g., send data to backend)
//     } catch (error) {
//       console.error('Error uploading profile:', error);
//     }
//   };

//   const handleFundraiserBtn = () => {
//     navigate('/fundraisings');
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-20 bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="flex justify-center items-center">
//         <div className="relative w-40 h-40">
//           <input
//             readOnly={!isEditable}
//             type="file"
//             accept="image/*"
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleProfilePictureChange}
//           />
//           <img
//             src={profilePicturePreview || 'https://via.placeholder.com/150'}
//             alt="Profile"
//             className="w-full h-full object-cover rounded-full border-2 border-gray-300"
//           />
//           {errors.profilePicture && <p className="text-red-500">{errors.profilePicture.message}</p>}
//         </div>
//       </div>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-center">{userInfo?.email}</h1>
//         <p className="text-center text-gray-600">{userInfo?.email}</p>

//         <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               id='name'
//               {...register("name")}
//               readOnly={!isEditable}
//               className={`w-full px-3 py-2 border rounded ${
//                 isEditable ? 'bg-white' : 'bg-gray-200'
//               }`}
//             />
//             {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Phone</label>
//             <input
//               type="text"
//               id='phone'
//               {...register("phone")}
//               readOnly={!isEditable}
//               className={`w-full px-3 py-2 border rounded ${
//                 isEditable ? 'bg-white' : 'bg-gray-200'
//               }`}
//             />
//             {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id='email'
//               readOnly
//               {...register("email")}
//               className="w-full px-3 py-2 border rounded bg-gray-200"
//             />
//             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//           </div>
//           {isEditable && (
//             <>
//               <div>
//                 <label className="block text-gray-700">Current Password</label>
//                 <input
//                   type="password"
//                   id='currentPassword'
//                   {...register("currentPassword")}
//                   className="w-full px-3 py-2 border rounded bg-white"
//                 />
//                 {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-gray-700">New Password</label>
//                 <input
//                   type="password"
//                   id='newPassword'
//                   {...register("newPassword")}
//                   className="w-full px-3 py-2 border rounded bg-white"
//                 />
//                 {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-gray-700">Confirm Password</label>
//                 <input
//                   type="password"
//                   id='confirmPassword'
//                   {...register("confirmPassword")}
//                   className="w-full px-3 py-2 border rounded bg-white"
//                 />
//                 {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
//               </div>
//             </>
//           )}
//           <div className="flex justify-center">
//             {isEditable ? (
//               <>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditable(false)}
//                   className="px-4 py-2 mx-2 bg-gray-500 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setIsEditable(true)}
//                 className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </form>
//         <div className="mt-6 flex justify-center space-x-4">
//           <button
//             className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//             onClick={handleFundraiserBtn}
//           >
//             <FaWallet className="mr-2" />
//             Your Fundraisers
//           </button>
//           <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
//             <BsChatDots className="mr-2" />
//             Chat with Admin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUserProfile, getUser } from '../api/user';
import { userFormData } from '../services/interface/user';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const profileSchema = z.object({
  name: z.string().nonempty('Name is required'),
   email: z.string().email('Invalid email').nonempty('Email is required'),
  phone: z.string().nonempty('Phone number is required').regex(/^\d+$/, 'Phone number must be digits only'),
  profilePicture: z.instanceof(File).optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {


  const navigate = useNavigate()

  const [userDetails,setUserDetails] = useState< userFormData | null>({})
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues:{
      name:userDetails?.name,
      email:userDetails?.email,
      phone:userDetails?.phone,
      profilePicture:userDetails?.profilePicture
    }
  });

 const { userInfo } = useSelector((state: RootState)=> state.auth) 
 const userId = userInfo?._id

  const fetchUser = async () => {
    try {
      console.log("inner");
      
      const response = await getUser(userId);
      // console.log("response", response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching fundraisings:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); 


  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.profilePicture && data.profilePicture instanceof File) {
      formData.append('profilePicture', data.profilePicture);
    }

    try {
      const response = await editUserProfile(formData);

      console.log('Profile updated successfully:', response);
      if (data.profilePicture && data.profilePicture instanceof File) {
        const previewUrl = URL.createObjectURL(data.profilePicture);
        setProfilePicPreview(previewUrl);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleFundraisngNavigate=()=>{
    navigate('/fundraisings')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 mt-24 w-[60%] bg-gray-50 rounded-lg shadow-lg space-y-6">
      <div className="flex flex-col items-center mb-6">
        <input
          type="file"
          {...register('profilePicture')}
          id="profilePicture"
          className="hidden"
          defaultValue={userDetails?.profilePicture}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('profilePicture', file);
              const previewUrl = URL.createObjectURL(file);
              setProfilePicPreview(previewUrl);
            }
          }}
        />
        <label htmlFor="profilePicture" className="cursor-pointer">
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500">Upload Image</span>
            )}
          </div>
        </label>
      </div>
      <div className='w-[50%] ml-20'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={userDetails?.name}
            {...register('name')}
            readOnly={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.name ? 'border-red-500' : ''} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            defaultValue={userDetails?.email}
            type="text"
            {...register('email')}
            readOnly
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.email ? 'border-red-500' : ''} bg-gray-100`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
          defaultValue={userDetails?.phone}
            type="number"
            {...register('phone')}
            readOnly={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.phone ? 'border-red-500' : ''} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition">
            Submit
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button type="button" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 transition">Change Password</button>
        <button type="button" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-purple-600 transition">Wallet</button>
        <button type="button" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-pink-600 transition">Chat</button>
        <button type="button" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-yellow-600 transition"
        onClick={handleFundraisngNavigate}
        >My Fundraising</button>
      </div>
    </form>
  );
};

export default Profile;
