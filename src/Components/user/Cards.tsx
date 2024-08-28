import React, { useCallback, useEffect, useState } from 'react';
import { beneficiary } from '@/services/interface/interface';
import { allPosts } from '@/api/user';
import { CircularProgress } from "@nextui-org/react";
import { capitalizeFirstLetter, truncateText } from '@/services/functions/Functions';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@nextui-org/react";
import { Input } from "@/Components/ui/input"
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import _ from 'lodash';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


interface CardProps {
    limit?: number;
}

const Card: React.FC<CardProps> = ({ limit }) => {
    const [postDetails, setPostDetails] = useState<beneficiary[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [category,setCategory] = useState<string>('')



    const navigate = useNavigate();


    const fetchPostDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await allPosts(currentPage, searchTerm, category);
            setPostDetails(response.data.data);
            setTotalPages(response.data.totalPages);
            console.log(response.data.data);
            setLoading(false);

        } catch (error) {
            console.log("Error fetching fundraising details:", error);
            setLoading(false);
        }
    }
        , [currentPage, searchTerm, category]);



    const debouncedFetchPostDetails = useCallback(_.debounce(fetchPostDetails, 500), [fetchPostDetails]);


    const displayedPosts = limit ? postDetails.slice(0, limit) : postDetails;

    useEffect(() => {
        debouncedFetchPostDetails();

        return (() => {
            debouncedFetchPostDetails.cancel();
        })
    }, [debouncedFetchPostDetails])

    const renderSkeleton = () => (
        <div className="relative flex flex-col mb-32 mt-6 text-gray-700 bg-white md:w shadow-md rounded-xl w-80 mx-4">
            <Skeleton className="relative h-56 -mt-6 rounded-xl" />
            <div className="p-6">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <div className="flex">
                    <Skeleton className="h-10 w-10" />
                    <div className='ml-2'>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="w-px h-24 bg-gray-300 mx-4"></div>
                    <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="mt-4 h-4 w-full" />
            </div>
            <div className="p-6 pt-0">
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }

    const handleNextPage = () => {
        console.log('current page', currentPage);

        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
            console.log('current page', currentPage);

        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }

    const categorySelection = (key: React.Key) => {
        setCategory(String(key))
       
    }
   

    return (
        <div className='flex flex-col justify-center items-center'>
            {!limit &&
                <div className='flex '>
                    <Input
                        placeholder='Search for posts'
                        className='w-96  mb-10 mr-5'
                        onChange={handleSearch}
                    />


                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                            >
                               Filter by Category
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" onAction={categorySelection}>
                            <DropdownItem key="">All</DropdownItem>
                            <DropdownItem key="medical">medical</DropdownItem>
                            <DropdownItem key="education">education</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>

                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                {loading ? (
                    <>
                        {Array.from({ length: limit || 3 }).map((_, index) => (
                            <div key={index}>
                                {renderSkeleton()}
                            </div>
                        ))}
                    </>
                ) : (
                    displayedPosts.map((post, indx) => (
                        <div
                            key={indx}
                            className="relative flex flex-col mb-32 mt-6 text-gray-700 bg-white md:w shadow-md rounded-xl w-80 mx-4"
                            role="region"
                            aria-labelledby={`post-heading-${indx}`}
                        >
                            <div className="relative h-56 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={post.profilePic && post.profilePic[0] ? (typeof post.profilePic[0] === 'string' ? post.profilePic[0] : URL.createObjectURL(post.profilePic[0])) : "https://i.sstatic.net/l60Hf.png"}
                                    alt={`${post.name} profile`}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h5
                                    id={`post-heading-${indx}`}
                                    className="mb-2 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900"
                                >
                                    {post.name}
                                </h5>
                                <div className='flex'>
                                    <CircularProgress
                                        size="lg"
                                        value={Number(((Number(post.contributedAmount) / Number(post.amount)) * 100).toFixed(2))}
                                        color="success"
                                        showValueLabel={true}
                                        aria-label={`${post.contributedAmount} out of ${post.amount} raised`}
                                    />
                                    <div className='ml-2'>
                                        <p className="text-green-600 font-bold">
                                            Raised:
                                            <br /> {post.contributedAmount}
                                        </p>
                                        <p className="text-red-600 font-bold">
                                            Need:
                                            <br /> {post.amount}
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
                                    aria-label={`Read more about ${post.name}`}
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!limit &&
                <div className='flex justify-center items-center w-full mb-10 gap-6'>
                    <button className='w-10 h-10 flex items-center justify-center rounded-full border p-2  hover:bg-blue-gray-300'
                        onClick={handlePreviousPage}
                    >
                        <GrLinkPrevious />
                    </button>

                    <button className='w-10 h-10 flex items-center justify-center rounded-full border p-2 hover:bg-blue-gray-300 '
                        onClick={handleNextPage}
                    >
                        <GrLinkNext />
                    </button>

                </div>
            }
        </div>
    );
};
export default Card;
