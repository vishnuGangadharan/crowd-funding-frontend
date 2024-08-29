import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { updateBeneficiaryData, } from '@/api/user';
import { toast } from 'react-toastify';
interface PostUpdateProps {
  postId: string;
}

const PostUpdate: React.FC<PostUpdateProps> = ({postId}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [error, setError] = useState<{content?: string, files?: string}>({})
  const ref = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 2) {
      setError(prev => ({ ...prev, files: 'You can only upload up to 2 files' }));
      return;
    }

    
    setFiles([...files, ...selectedFiles])

    //FOR PREVIEW
    const newPreview = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview([...preview, ...newPreview])
  }

  const handleModalClose = () => {
    setContent('');
    setFiles([]);
    setPreview([]);
    setError({});
    setLoading(false);
    onOpenChange();
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newError: { content?: string; files?: string } = {};
  
    if (content.length < 10) {
      newError.content = "Content should be at least 10 characters long";
    }
    if (files.length === 0) {
      newError.files = "Please upload at least one file";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        formData.append('imagesUpdate', file);
      } else if (file.type.startsWith('video/')) {
        formData.append('videosUpdate', file);
      }
    });
    formData.append('content', content);
    formData.append('postId', postId);
  
    try {
      setLoading(true);
      const response = await updateBeneficiaryData(formData);
      if (response?.data.status === true) {
        toast.success("Post updated successfully");
        handleModalClose();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  return (
    <>
      <Button className='bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] hover:from-[#FF1CF7] hover:to-[#B249F8] transition duration-300 text-white font-semibold' onPress={onOpen}>update status</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent>
    {() => (
      <form onSubmit={handleSubmit}>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody>
          <div>
            <JoditEditor
              className='mb-5'
              ref={ref}
              value={content}
              onChange={(content) => setContent(content)}
            />
            {error.content && <p className='text-red-500'>{error.content}</p>}
            <div className='flex items-center space-x-4'>
              <label
                htmlFor="fileUpload"
                className='cursor-pointer p-4 border border-dashed border-gray-400 rounded-lg'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </label>
              <input
                type="file"
                id='fileUpload'
                className='hidden'
                onChange={handleFileChange}
                accept='image/*,video/*'
                multiple
              />
              {error.files && <p className='text-red-500 text-sm'>{error.files}</p>}
            </div>
            <div className='flex space-x-4'>
              {preview.map((preview, indx) => (
                <div key={indx} className='w-24 h-24 relative'>
                  {files[indx].type.includes('image') ? (
                    <img src={preview} alt="Preview" className='w-24 h-24 object-cover' />
                  ) : (
                    <video src={preview} controls className='w-24 h-24 object-cover' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleModalClose}>
            Close
          </Button>
          <Button type='submit' color="success">
            {loading ? <Spinner color="warning" /> : 'Update'}
          </Button>
        </ModalFooter>
      </form>
    )}
  </ModalContent>
</Modal>

    </>
  )
}

export default PostUpdate
