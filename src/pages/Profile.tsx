

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
  name: z.string().min(3, "Name must be at least 3 characters long")
  .refine(s => /^[a-zA-Z0-9_-]+$/.test(s), {
    message: "Only letters,No characters allowed",
  }),
  email: z.string().email('Invalid email'),
  phone: z.string()
  .refine(value => /^\d{10}$/.test(value), {
    message: "Phone number must be exactly 10 digits long",
  }),
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
      const response = await editUserProfile(formData as any);

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
    navigate('/fundraising')
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
          <div className="w-40 h-40 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <img src={userDetails?.profilePicture} alt="Default Profile" className="object-cover w-full h-full" />
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
