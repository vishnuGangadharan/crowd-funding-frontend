import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaEdit, FaWallet } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { editUserProfile } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(value => /^\d{10}$/.test(value), {
    message: "Phone number must be exactly 10 digits long",
  }),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  const passwordFields = [data.currentPassword, data.newPassword, data.confirmPassword];

  // Check if any password field is filled
  const isPasswordFieldFilled = passwordFields.some(field => field !== undefined && field !== "");

  if (isPasswordFieldFilled) {
    // All password fields must be filled
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "All password fields must be filled",
        path: ["currentPassword", "newPassword", "confirmPassword"].filter(key => !(key in data) || !data[key as keyof typeof data])
      });
    }

    // Validate currentPassword
    if (data.currentPassword && data.currentPassword.length < 7) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password should be at least 7 characters",
        path: ["currentPassword"],
      });
    }
    
    // Validate newPassword
    if (data.newPassword) {
      if (data.newPassword.length < 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password should be at least 7 characters",
          path: ["newPassword"],
        });
      }
      if (!/[a-zA-Z]/.test(data.newPassword)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain letters.",
          path: ["newPassword"],
        });
      }
      if (!/\d/.test(data.newPassword)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain numbers.",
          path: ["newPassword"],
        });
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain special characters.",
          path: ["newPassword"],
        });
      }
      if (data.confirmPassword !== data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    }
  }
});

interface FormValues {
  name: string;
  email: string;
  phone: string;
  currentPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  profilePicture: File | string;
}

const Profile: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      currentPassword: '',
      confirmPassword: '',
      newPassword: '',
      profilePicture: '',
    },
    mode: "onSubmit"
  });

  const [isEditable, setIsEditable] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState('./User/5240.jpg');

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("profilePicture", file);
      const reader = new FileReader();
      reader.onload = () => setProfilePicturePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    
    const response = await editUserProfile(data);
    // Handle form submission logic here (e.g., send data to backend)
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src='./User/5240.jpg' alt="Background" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex justify-center items-center">
          <img src={profilePicturePreview} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" />
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">{userInfo.email}</h1>
        <p className="text-center text-gray-600">{userInfo.email}</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2"
            />
            {errors.profilePicture && <p className="text-red-500">{errors.profilePicture.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              id='name'
              {...register("name")}
              readOnly={!isEditable}
              className={`w-full px-3 py-2 border rounded ${
                isEditable ? 'bg-white' : 'bg-gray-200'
              }`}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              id='phone'
              {...register("phone")}
              readOnly={!isEditable}
              className={`w-full px-3 py-2 border rounded ${
                isEditable ? 'bg-white' : 'bg-gray-200'
              }`}
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              id='email'
              readOnly
              {...register("email")}
              className="w-full px-3 py-2 border rounded bg-gray-200"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          {isEditable && (
            <>
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  id='currentPassword'
                  {...register("currentPassword")}
                  className="w-full px-3 py-2 border rounded bg-white"
                />
                {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  id='newPassword'
                  {...register("newPassword")}
                  className="w-full px-3 py-2 border rounded bg-white"
                />
                {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  id='confirmPassword'
                  {...register("confirmPassword")}
                  className="w-full px-3 py-2 border rounded bg-white"
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              </div>
            </>
          )}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              <BsChatDots className="mr-2" /> Chat
            </button>
            <button
              type="button"
              onClick={() => setIsEditable(!isEditable)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">
              <FaWallet className="mr-2" /> Wallet
            </button>
          </div>
          {isEditable && (
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
