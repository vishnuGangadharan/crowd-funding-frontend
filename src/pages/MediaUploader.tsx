// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { fileUploader } from '../api/user';

// const schema = z.object({
//   profilePic: z.instanceof(FileList).refine(files => files.length === 1, "Profile picture is required"),
//   supportingDocs: z.instanceof(FileList).refine(files => files.length === 3, "Exactly 3 supporting documents are required"),
// });

// type FormData = z.infer<typeof schema>;

// const ProfileAndDocsUploader: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(schema)
//   });

//   const [profilePic, setProfilePic] = useState<string | null>(null);
//   const [supportingDocs, setSupportingDocs] = useState<string[]>([]);

//   const onSubmit: SubmitHandler<FormData> =async data => {
//     const formData = new FormData();
//     formData.append('profilePic', data.profilePic[0]);
//     Array.from(data.supportingDocs).forEach(file => formData.append('supportingDocs', file));
//     try {

//         const response = await fileUploader(formData)
//         console.log("......ddd",response);
        
        
//     } catch (error) {
//         console.log(error);
        
//     }
   
//   };

//   const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => setProfilePic(e.target?.result as string);
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const handleSupportingDocsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const filesArray = Array.from(event.target.files).slice(0, 3).map(file => URL.createObjectURL(file));
//       setSupportingDocs(filesArray);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-lg mt-44">
//       <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Upload Profile Picture and Supporting Documents</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
//         {/* Profile Picture Upload */}
//         <div className="flex flex-col items-center">
//           <label className="block text-gray-700 text-xl font-semibold mb-2">Profile Picture</label>
//           <div className="w-32 h-32 mb-4 relative border-4 border-blue-500 rounded-full overflow-hidden">
//             <img src={profilePic || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
//             <input type="file" accept="image/*" {...register('profilePic')} onChange={handleProfilePicChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
//           </div>
//           {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic.message}</p>}
//         </div>

//         {/* Supporting Documents Upload */}
//         <div className="flex flex-col items-center">
//           <label className="block text-gray-700 text-xl font-semibold mb-2">Supporting Documents (exactly 3)</label>
//           <input type="file" accept="image/*" multiple {...register('supportingDocs')} onChange={handleSupportingDocsChange} className="mb-4 border border-gray-300 p-2 rounded-lg cursor-pointer" />
//           <div className="grid grid-cols-3 gap-4">
//             {supportingDocs.map((image, index) => (
//               <div key={index} className="w-32 h-32 border-4 border-green-500 rounded-lg overflow-hidden">
//                 <img src={image} alt={`document-${index}`} className="w-full h-full object-cover" />
//               </div>
//             ))}
//           </div>
//           {errors.supportingDocs && <p className="text-red-500 text-sm">{errors.supportingDocs.message}</p>}
//         </div>

//         <div className="flex justify-center">
//           <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileAndDocsUploader;
