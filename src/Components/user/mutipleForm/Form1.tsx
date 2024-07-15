

import React, { useState } from 'react';
import {Input} from "@nextui-org/react";


const Form1: React.FC = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedValue, setSelectedValue] = useState('default');

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Pic:', profilePic);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Selected Value:', selectedValue);
    
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-70 ">
        <div className="flex justify-center mb-2">
            
          <label htmlFor="profilePic">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden mb-4">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                < div>
                  <span className="text-gray-500 text-center flex justify-center">Click to upload</span>
                </div>
              )}
            </div>
            
            <input
              type="file"
              id="profilePic"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>
        <div className='mb-4'>

        <label htmlFor="dropdown" className="block text-gray-700 mb-2">Select an option:</label>
          <select
            id="dropdown"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="default" disabled>Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
            </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form1;
