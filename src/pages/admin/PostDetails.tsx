import React, { useEffect, useState } from 'react'
import { Carousel } from "flowbite-react";
import beneficiary from '@/services/interface/beneficiary';
import { getPostDetails } from '../../api/admin';
import { useParams, useNavigate } from 'react-router-dom';



const PostDetails = () => {

    const [postDetails, setPostDetails] = useState<beneficiary>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await getPostDetails(id as string);
                console.log("admin", response);

                console.log(response.data);
                setPostDetails(response.data);
            } catch (error) {
                console.log("Error fetching fundraising details:", error);
            }
        };
        fetchPostDetails();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <button
                onClick={handleGoBack}
                className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Go Back
            </button>
            <div>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Profile Images</h1>
            <Carousel className='w-[50%] h-60 mb-4' >
                
                {postDetails?.profilePic?.map((img, indx) => (
                    <img src={img} key={indx} alt={`Slide ${indx + 1}`} />
                ))}
            </Carousel>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Supporting Documents</h1>
            <Carousel className='w-[50%] h-60' indicators={false}>

                {postDetails?.supportingDocs?.map((img, indx) => (
                    <img src={img} key={indx} alt={`Slide ${indx + 1}`} />
                ))}
            </Carousel>
            </div>
            <div>
               
            </div>
        </div>
    )
}

export default PostDetails
