

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fileUploader } from '../../api/user';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteBeneficiaryData } from '@/redux/slice/beneficiarySlice';
import Spinner from '@/Components/user/Spinner';

const schema = z.object({
  profilePics: z.instanceof(FileList).refine(files => files.length === 3, "Exactly 3 profile pictures are required"),
  supportingDocs: z.instanceof(FileList).refine(files => files.length === 3, "Exactly 3 supporting documents are required"),
});

type FormData = z.infer<typeof schema>;

const ProfileAndDocsUploader: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { beneficiaries } = useSelector((state: RootState) => state.beneficiary);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [profilePics, setProfilePics] = useState<string[]>([]);
  const [supportingDocs, setSupportingDocs] = useState<string[]>([]);
  const [loading,setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true)
    if (data.profilePics.length !== 3 || data.supportingDocs.length !== 3) {
      console.error("You must upload exactly 3 profile pictures and 3 supporting documents.");
      return;
    }

    const formData = new FormData();
    Array.from(data.profilePics).forEach(file => formData.append('profilePics', file));
    Array.from(data.supportingDocs).forEach(file => formData.append('supportingDocs', file));

    // Append beneficiaries data as JSON string
    formData.append('beneficiaries', JSON.stringify(beneficiaries));

    try {
      setLoading(false)
      const response = await fileUploader(formData as any);
      console.log("Upload successful", response);
      if (response?.status === 200) {
        dispatch(deleteBeneficiaryData());
        navigate('/fundraising');
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleModalCancel = () => {
    setOpenModal(false);
    navigate('/home');
  };

  const handleProfilePicsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Limit to 3 files and update state
      const filesArray = Array.from(event.target.files).slice(0, 3).map(file => URL.createObjectURL(file));
      setProfilePics(filesArray);
    }
  };

  const handleSupportingDocsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Limit to 3 files and update state
      const filesArray = Array.from(event.target.files).slice(0, 3).map(file => URL.createObjectURL(file));
      setSupportingDocs(filesArray);
    }
  };

  return (
    <div>

    {loading ? (
   <Spinner/>
    ):(
    <div className="container mx-auto p-4 bg-green-50 rounded-lg shadow-lg w-[70%] mt-20">
      <p className='text-center text text-red-500'>You're just 1 click ahead for your fundraising campaign</p>
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Upload Profile Pictures
        <br /> & <br />
        Supporting Documents</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Profile Pictures Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-700 text-xl font-semibold mb-2">Profile Pictures (exactly 3)</label>
          <input type="file" accept="image/*" multiple {...register('profilePics')} onChange={handleProfilePicsChange} className="mb-4 border border-gray-300 p-2 rounded-lg cursor-pointer" />
          <div className="grid grid-cols-3 gap-4">
            {profilePics.map((image, index) => (
              <div key={index} className="w-32 h-32 border-4 border-blue-500 rounded-lg overflow-hidden">
                <img src={image} alt={`profile-pic-${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {errors.profilePics && <p className="text-red-500 text-sm">{errors.profilePics.message}</p>}
        </div>

        {/* Supporting Documents Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-gray-700 text-xl font-semibold mb-2">Supporting Documents (exactly 3)</label>
          <input type="file" accept="image/*" multiple {...register('supportingDocs')} onChange={handleSupportingDocsChange} className="mb-4 border border-gray-300 p-2 rounded-lg cursor-pointer" />
          <div className="grid grid-cols-3 gap-4">
            {supportingDocs.map((image, index) => (
              <div key={index} className="w-32 h-32 border-4 border-green-500 rounded-lg overflow-hidden">
                <img src={image} alt={`document-${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {errors.supportingDocs && <p className="text-red-500 text-sm">{errors.supportingDocs.message}</p>}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setOpenModal(true)}>Cancel</Button>

          <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to cancel fundraising?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleModalCancel}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <button type="submit" className="ml-5 bg-blue-500 text-white px-8 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Submit</button>
        </div>
      </form>
    </div>
    )}
    </div>
  );
};

export default ProfileAndDocsUploader;
