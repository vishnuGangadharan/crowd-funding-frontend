import React from 'react';
import { Input } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { form1Types } from '../../../services/interface';
import { useNavigate } from 'react-router-dom';

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(4, "Too short")
    .refine(s => /^[a-zA-Z0-9_-]+$/.test(s), {
      message: "Only letters, numbers, and underscores allowed",
    }),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Too short"),
  option: z.string().refine(val => val !== "default", "Select an option"),
});

const Form1: React.FC = () => {

  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  console.log("user", userInfo.email);

  const { register, handleSubmit,setError, formState: { errors } } = useForm<form1Types>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      option: "default",
    },
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<form1Types> = async (data) => {
    if (data.email !== userInfo.email) {
      setError('email',{type: "manual", message: "your not verified user"});
      return;
    }
    try {
      console.log("Form data:", data);
      // const response = await fundraiserSignup(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-70 ">
      
        <div className='mb-4'>
          <label htmlFor="dropdown" className="block text-gray-700 mb-2">Select an option:</label>
          <select
            id="dropdown"
            {...register("option")}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="default" disabled>Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {errors.option && <p className="text-red-500">{errors.option.message}</p>}
        </div> 
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full px-3"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-3"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="tel"
            placeholder="Phone"
            {...register('phone')}
            className="w-full px-3"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
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
