

import React, { useState } from 'react';
import {Input} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from "react-hook-form";


const formSchema = {
  
}

const Form1: React.FC = () => {
  // const [profilePic, setProfilePic] = useState<File | null>(null);
 
  // const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProfilePic(e.target.files[0]);
  //   }
  // };
const {userInfo} = useSelector((state: any) => state.auth);
console.log("user", userInfo.email);


  const [form,setForm] = useState({
    name: "",
    email: "",
    phone: "",
    option: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("test");
    console.log('Form data:', form);
    
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-70 ">
        <div className="flex justify-center mb-2">
{/*             
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
          </label> */}
        </div>
        <div className='mb-4'>

        <label htmlFor="dropdown" className="block text-gray-700 mb-2">Select an option:</label>
          <select
            id="dropdown"
            value={form.option}
            onChange={(e) => setForm({...form, option: e.target.value})}
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
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <Input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
            className="w-full px-3 "
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
           Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form1;
