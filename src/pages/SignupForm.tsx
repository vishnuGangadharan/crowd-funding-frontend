// import React from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Link } from 'react-router-dom';
// import { signup } from '../api/user';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';

// const formSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long")
//     .refine(s => /^[a-zA-Z0-9_-]+$/.test(s), {
//       message: "Only letters,No characters allowed",
//     }),
//   email: z.string().email("Invalid email address"),
//   phone: z.string()
//     .refine(value => /^\d{10}$/.test(value), {
//       message: "Phone number must be exactly 10 digits long",
//     }),
//   password: z.string()
//     .min(7, "Password should be at least 7 characters")
//     .refine(s => /[a-zA-Z]/.test(s), {
//       message: "Password must contain letters.",
//     })
//     .refine(s => /\d/.test(s), {
//       message: "Password must contain numbers.",
//     })
//     .refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
//       message: "Password must contain special characters.",
//     }),
//   confirmPassword: z.string()
//     .min(7, "Confirm Password should be at least 7 characters"),
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   interface FormValues {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     confirmPassword: string;
//   }

//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: ''
//     },
//     mode: "onTouched"
//   });

//   const onSubmit: SubmitHandler<FormValues> = async(data) => {
//     try {
//       const response = await signup(data);      
//       if(response.status === true){
//         navigate('/otp', {
//           state: {
//             email: data.email,
//             name: data.name,
//             phone: data.phone
//           }
//         });
//       } else {
//         console.log("Signup failed:", response);
//       }
//       console.log("Signup successful:", response);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   const googleSignup = async (credentialResponse: CredentialResponse) => {
//     if (credentialResponse.credential) {
//       try {
//         const decode = jwtDecode(credentialResponse.credential);
//         const data = {
//           name: decode.name,
//           email: decode.email,
//           phone: '0000000000',  // Since phone number is not provided by Google, use a default value or handle it appropriately
//           password: '12345aA@',
//           confirmPassword: '12345aA@'
//         };

//         const response = await signup(data);
//         if(response.status === true){
//           navigate('/otp', {
//             state: {
//               email: data.email,
//               name: data.name,
//               phone: data.phone
//             }
//           });
//         } else {
//           console.log("Signup failed:", response);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row md:shadow-bottom-left">
//         <div className="mb-4 md:mb-0 md:w-1/2 md:rounded-l-lg">
//           <img
//             src="./User/signup.avif"
//             alt="Signup"
//             className="w-full h-[200px] md:h-full object-cover rounded-lg md:rounded-l-lg md:rounded-r-none"
//           />
//         </div>
//         <div className="md:w-1/2 p-4 md:p-8">
//           <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

//           <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <input
//                 placeholder='Name'
//                 type="text"
//                 id="name"
//                 {...register("name")}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
//               />
//               {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//             </div>
//             <div>
//               <input
//                 placeholder='Phone'
//                 type="text"
//                 id="phone"
//                 {...register("phone")}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
//               />
//               {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
//             </div>
//             <div>
//               <input
//                 placeholder='Email'
//                 type="email"
//                 id="email"
//                 {...register("email")}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
//               />
//               {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//             </div>
//             <div>
//               <input
//                 placeholder='Password'
//                 type="password"
//                 id="password"
//                 {...register("password")}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
//               />
//               {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//             </div>
//             <div>
//               <input
//                 placeholder='Confirm Password'
//                 type="password"
//                 id="confirmPassword"
//                 {...register("confirmPassword")}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
//               />
//               {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//               >
//                 Sign Up
//               </button>
//             </div>
//             <div className="text-center mt-4">
//               <GoogleLogin
//                 onSuccess={googleSignup}
//                 onError={() => {
//                   console.log('Login Failed');
//                 }}
//               />
//               <p className='mt-5'>Already have an account? 
//                 <Link to="/login"> Login</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
