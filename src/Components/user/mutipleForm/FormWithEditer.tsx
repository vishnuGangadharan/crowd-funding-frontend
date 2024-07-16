// import React, { useRef, useState } from 'react';
// import JoditEditor from 'jodit-react';
// import HTMLReactParser from 'html-react-parser';
// import { Button } from '@nextui-org/react';

// function FormWithEditor() {
//     const editor = useRef(null);
//     const [content, setContent] = useState('');
    
//     return (
//         <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10'>
//             <div className='bg-white shadow-md rounded-lg p-6 w-[60%] max-w-3xl'>
//                 <h1 className='text-2xl font-bold text-center mb-4'>Write your story</h1>
//                 <JoditEditor
//                     ref={editor}
//                     value={content}
//                     onChange={(newContent) => setContent(newContent)}
                   
//                 />
//                 <Button
//                    // shadow
//                     className='mt-4 w-full'
//                     onClick={() => alert('Content submitted!')}
//                 >
//                     Submit
//                 </Button>
//             </div>
            
//             <div className='mt-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl'>
//                 <h2 className='text-xl font-semibold mb-3'>Preview</h2>
//                 <div className='prose max-w-none'>
//                     {HTMLReactParser(content)}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FormWithEditor;






import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';
import { Button } from '@nextui-org/react';
import axios from 'axios';

function FormWithEditor() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState("");
    const [profilePicFile, setProfilePicFile] = useState("");

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
            setProfilePicFile(file); // Save the file to send to backend
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', content);
        if (profilePicFile) {
            formData.append('profilePic', profilePicFile);
        }
        console.log("name:", name);
        console.log("bio:", content);
        console.log('profilePic:', profilePicFile);
        
        
        
        console.log("Form data:", formData);
        
        try {
            const response = await axios.post('/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center mb-4">User Profile Form</h1>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                        />
                        {profilePic && (
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="mt-4 w-24 h-24 rounded-full object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Bio
                        </label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                            
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full"
                    >
                        Submit
                    </Button>
                </form>
            </div>

            <div className="mt-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-xl font-semibold mb-3">Preview</h2>
                <div className="prose max-w-none">
                    <h3>{name}</h3>
                    {profilePic && <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />}
                    {HTMLReactParser(content)}
                </div>
            </div>
        </div>
    );
}

export default FormWithEditor;
