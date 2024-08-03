import React, { useEffect, useState } from 'react';
import { beneficiary } from '@/services/interface/interface';
import { allPosts } from '@/api/user';
import { CircularProgress } from "@nextui-org/react";
import { capitalizeFirstLetter, truncateText } from '@/services/functions/Functions';
import { useNavigate } from 'react-router-dom';
interface CardProps {
    limit?: number; 
}

const Card :React.FC<CardProps> = ({limit}) => {
    const [postDetails, setPostDetails] = useState<beneficiary[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await allPosts();
                setPostDetails(response.data);
                console.log(response.data);

            } catch (error) {
                console.log("Error fetching fundraising details:", error);
            }
        };
        fetchPostDetails();
    }, []);

    const displayedPosts = limit ? postDetails.slice(0, limit) : postDetails;


    return (
        <div className="flex flex-wrap justify-start grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts && displayedPosts.map((post, indx) => (

                <div key={indx} className="relative flex flex-col mb-32 mt-6 text-gray-700 bg-white md:w shadow-md rounded-xl w-80 mx-4">
                    <div className="relative h-56 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                        <img
                            src={post.profilePic && post.profilePic[0] ? (typeof post.profilePic[0] === 'string' ? post.profilePic[0] : URL.createObjectURL(post.profilePic[0])) : "https://i.sstatic.net/l60Hf.png"}
                            alt="card"
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    <div className="p-6">
                        <h5 className="mb-2 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {post.name}
                        </h5>
                        <div className='flex'>

                            <CircularProgress
                                size="lg"
                                value={Number(((Number(post.contributedAmount) / Number(post.amount)) * 100).toFixed(2))}
                                color="success"
                                showValueLabel={true}
                            />
                            <div className='ml-2'>
                                <p className="text-green-600 font-bold">
                                    Raised :
                                    <br /> {post.contributedAmount}
                                </p>
                                <p className="text-red-600 font-bold">
                                    Need : 
                                    <br />{post.amount}
                                </p>
                            </div>

                            <div className="w-px h-24 bg-gray-300 mx-4"></div>
                            <div className='flex flex-col justify-center items-center'>
                                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: 'black', }} className='font-bold'>Fundraiser</span>
                                <span className=''>{capitalizeFirstLetter(post.fundraiser.name)}</span>
                            </div>
                        </div>
                        <p className="font-sans text-base font-light leading-relaxed">
                            {truncateText(post && post?.heading ? post.heading : "", 8)}
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button
                            className="font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
                            type="button"
                            onClick={() => navigate(`/postdetails/${post._id}`)}
                        >
                            Read More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
