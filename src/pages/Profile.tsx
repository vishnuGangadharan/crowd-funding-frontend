

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import UpdatePassword from '../Components/user/UpdatePassword';
import { userFormData } from '@/services/interface/user';
import { editUserProfile, getUser } from '@/api/user';
import {toast}  from 'react-toastify'

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
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
      setProfilePicPreview(response.data.profilePicture);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleSubmit = useCallback( async (e: React.FormEvent) => {
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
        // Optionally update the local state with the new data
        setUserDetails({
          ...userDetails,
          email,
          phone,
          name,
          profilePicture: profilePicPreview || ''
        });
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  },[email, phone, name, image, userDetails, profilePicPreview]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicPreview(previewUrl);
      setImage(file);
    }
  },[]);

  const handleFundraisingNavigate = () => {
    navigate('/fundraising');
  };

  const handleWalletClick = () =>{
    navigate(`/wallet?userId=${userId}`);
  }
  const handleChatClick = () => {
    navigate(`/chat?senderId=${userId}`)
};
  return (
    <form onSubmit={handleSubmit} className="mx-auto p-6 mt-24 w-[60%] bg-gray-50 rounded-lg shadow-lg space-y-6 mb-36">
      <div className="flex flex-col items-center mb-6">
        <input
          type="file"
          id="profilePicture"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="profilePicture" className="cursor-pointer">
          <div className="w-40 h-40 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile" className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105" />
            ) : (
              <span className="text-white">Upload Image</span>
            )}
          </div>
        </label>
      </div>
      <div className='w-[50%] ml-40 ' >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            readOnly={!isEditing}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
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
        <UpdatePassword />
        <button type="button" 
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-purple-600 transition"
          onClick={handleWalletClick}
          >
            Wallet
        </button>
        <button type="button" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-pink-600 transition"
        onClick={handleChatClick}
        >Chat</button>
        <button
          type="button"
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-yellow-600 transition"
          onClick={handleFundraisingNavigate}
        >
          My Fundraising
        </button>
      </div>
    </form>
  );
};

export default Profile;
