import React, { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";
import { Card, Progress } from "flowbite-react";
import { getPostDetails } from '../../api/user';
import beneficiary from '@/services/interface/beneficiary';
import parse from 'html-react-parser';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import PostComments from './PostComments';
import { formatDate } from '@/services/functions/Functions';
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaChevronCircleRight } from "react-icons/fa";
import PaymentModal from '@/Components/user/PaymentModal';
import ShowDonations from '@/Components/user/ShowDonations';
import { FaComments } from 'react-icons/fa';
import PostUpdate from './PostUpdate';
import { useParams } from 'react-router-dom';
import { countDown } from '@/services/functions/Functions';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import ReportModal from '@/Components/user/ReportModal';

const PostDetails: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [postDetails, setPostDetails] = useState<beneficiary>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Share
    const url = window.location.href;
    const title = postDetails?.heading as string;
    const image = postDetails?.profilePic ? postDetails.profilePic[0] : "";
    const fullUrl = `${url}?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}`;
    console.log('llllllllllll',url);
  
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await getPostDetails(id as string);
                console.log(response.data);
                setPostDetails(response.data);
            } catch (error) {
                console.log("Error fetching fundraising details:", error);
            }
        };
        fetchPostDetails();
    }, [id]);

    const handleImageClick = (img: string) => {
        setSelectedImage(img);
        onOpen();
    };

    const postId = postDetails?._id;
    const userId = userInfo?._id;
    const amount = Number(postDetails?.amount) || 0;
    const contributedAmount = Number(postDetails?.contributedAmount) || 0;
    const balance = amount - contributedAmount;



    const fundraiserId = postDetails?.fundraiser?._id;

    const handleChatClick = () => {
        navigate('/chat', {
            state: { senderId: userId, receiverId: fundraiserId }
        });
    };

    const handleStatusRoute = () => {
        navigate(`/status-updates?postId=${postId}`);
    }


    return (

        <HelmetProvider>
            <div className=" mx-auto p-4 bg-gradient-to-r from-blue-300 via-green-200 to-teal-100">
                {postDetails && (
                    <Helmet>
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={postDetails.heading} />
                        <meta property="og:description" content={postDetails.bio} />
                        <meta property="og:image" content={postDetails.profilePic ? postDetails.profilePic[0] : "https://yourwebsite.com/default-image.jpg"} />
                    </Helmet>
                )}
                <div className="flex flex-col md:flex-row">
                    {/* Left Column */}
                    <div className="md:w-2/3 p-4 bg-white shadow-lg rounded-lg">
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                            <Carousel leftControl={<FaCircleChevronLeft size={40} />} rightControl={<FaChevronCircleRight size={40} />} slideInterval={2000} className="rounded-lg">
                                {postDetails?.profilePic?.map((img, indx) => (
                                    <img src={img} key={indx} alt={`Slide ${indx + 1}`} />
                                ))}
                            </Carousel>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 mt-12 text-center">{postDetails?.heading}</h1>
                        {postDetails?.fundRequestConfirmed || postDetails?.targetDateFinished ? (<p className='text-red-500 font-semibold  text-2xl'>campaign is completed</p>) : (
                            <h1 className='text-2xl ml-2 font-semibold text-red-500'>Days Left : {countDown(postDetails?.targetDate)} Days</h1>
                        )}
                        <div className='flex flex-col space-y-2 p-4 '>
                            <span className='text-lg font-semibold text-gray-800'>Name : {postDetails?.name}</span>
                            <span className='text-md text-gray-600'>Age : {postDetails?.age} years old</span>
                            <span className='text-sm text-gray-500'> Target Date :{formatDate(postDetails?.targetDate)}</span>
                        </div>
                        <div>
                            {
                                postDetails?.category && postDetails.category === "education" ? (
                                    <div className="flex flex-col space-y-2 p-4">
                                        <span className='text-lg font-semibold text-gray-800'>Institute Details</span>
                                        <span className='text-md text-gray-600'> School Name : {postDetails?.educationDetails?.instituteName}</span>
                                        <span className='text-md text-gray-600'> School Address : {postDetails?.educationDetails?.instituteDistrict}</span>
                                        <span className='text-md text-gray-600'> Class : {postDetails?.educationDetails?.institutePostalAddress}</span>
                                        <span className='text-md text-gray-600'>  state: {postDetails?.educationDetails?.instituteState}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2 p-4">
                                        <span className='text-lg font-semibold text-gray-800'>Hospital Details</span>
                                        <span className='text-md text-gray-600'> Hospital name : {postDetails?.medicalDetails?.hospitalName}</span>
                                        <span className='text-md text-gray-600'> District : {postDetails?.medicalDetails?.hospitalDistrict}</span>
                                        <span className='text-md text-gray-600'> Address : {postDetails?.medicalDetails?.hospitalPostalAddress}</span>
                                        <span className='text-md text-gray-600'> State : {postDetails?.medicalDetails?.hospitalState}</span>
                                    </div>
                                )
                            }
                        </div>

                        <div className="text-gray-700 mb-4">
                            {postDetails?.bio && parse(postDetails.bio)}
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7]  hover:from-[#FF1CF7] hover:to-[#B249F8] transition duration-300 font-semibold text-white py-2 px-4 rounded-md">
                                Read More
                            </button>
                            <div>
                                {postDetails && postDetails.isApproved !== 'pending' ? (
                                    <ReportModal postId={postDetails?._id || ''} />
                                ) : ("")}
                            </div>

                            <button
                                className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7]  hover:from-[#FF1CF7] hover:to-[#B249F8] transition duration-300 text-white py-2 px-4 rounded-md"
                                onClick={handleStatusRoute}
                            >
                                previous updates
                            </button>



                            {userId === postDetails?.fundraiser?._id ?
                                <PostUpdate postId={postDetails?._id || ''} /> : ''
                            }



                        </div>
                        {postDetails && postDetails.isApproved !== 'pending' && postDetails?.fundRequestConfirmed || postDetails?.targetDateFinished ? (

                            <div className='mt-5 gap-5'>
                                <FacebookShareButton url={fullUrl} title={title}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <TwitterShareButton url={fullUrl} title={title} className='ml-3 mr-3'>
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <WhatsappShareButton url={fullUrl} title={title}>
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                        ) : ("")}
                    </div>

                    {/* Right Column */}
                    {postDetails?.isApproved !== "pending" ? (
                        <div className="md:w-1/3 p-4 bg-white shadow-lg rounded-lg md:ml-4 mt-4 md:mt-0">
                            <Card className="w-full shadow-lg rounded-lg">
                                <h3>Contribution Status</h3>
                                <p>Target Amount :{postDetails?.amount}</p>
                                <p>Current Contributed amount : {postDetails?.contributedAmount}</p>
                                <p>Balance :{balance}</p>
                                <Progress
                                    progress={Number(((Number(postDetails?.contributedAmount) / Number(postDetails?.amount)) * 100).toFixed(2))}
                                    progressLabelPosition="inside"
                                    textLabel="contribution status"
                                    textLabelPosition="outside"
                                    size="lg"
                                    labelProgress
                                    labelText
                                />
                            </Card>
                            <h2 className="text-2xl font-bold mb-4 mt-14">Contribute for me</h2>


                            <div>

                                {postDetails?.fundRequestConfirmed ? (<p className='text-red-500 font-semibold text-center text-2xl'>campaign is completed</p>) : (
                                    <div>
                                        {Number(postDetails?.amount) >= Number(postDetails?.contributedAmount) ? (
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full" onClick={handleOpenModal}>Donate Now</button>
                                        ) : (
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full" >Completed</button>
                                        )}
                                        {/* Render the PaymentModal component conditionally */}
                                        {isModalOpen && (
                                            <PaymentModal isOpen={isModalOpen} beneficiaryId={postDetails?._id} onClose={handleCloseModal} />
                                        )}
                                    </div>
                                )}
                            </div>



                            <ShowDonations beneficiaryId={postDetails?._id} widthClass='' limit={5} />
                        </div>
                    ) : ("")}
                </div>

                {/* Parent Card with Supporting Documents and Fundraiser Details */}
                <div className="bg-gray-200 flex flex-col md:flex-row lg:space-x-1 p-2 shadow-lg rounded-lg lg:w-2/3 mt-3">
                    {/* Supporting Documents Card */}
                    <div className="w-full md:w-1/2 shadow-lg rounded-lg p-4 bg-white h-32 mb-2 lg:mb-0">
                        <h3 className="text-xl font-semibold text-center">Supporting Documents</h3>
                        <div className="flex flex-wrap justify-center">
                            {postDetails?.supportingDocs?.map((img, indx) => (
                                <div key={indx} className="p-2">
                                    <img
                                        onClick={() => handleImageClick(img)}
                                        className="w-16 h-16 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        src={img}
                                        alt={`Supporting Document ${indx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fundraiser Details Card */}
                    <div className="w-full md:w-1/2 shadow-lg rounded-lg p-2 bg-white flex flex-col items-center h-32">
                        <div className='flex '>
                            <h3 className="text-xl font-semibold mb-2 text-center">Fundraiser Details</h3>

                            <button
                                onClick={handleChatClick}
                                className="flex items-center justify-center gap-2 ml-5 px-4 py-2 bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white rounded-lg hover:from-[#FF1CF7] hover:to-[#B249F8] transition duration-300 ease-in-out shadow-md"
                            >
                                <FaComments className="w-5 h-5" />
                                <span>Chat</span>

                            </button>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start">
                            <img
                                className="w-14 h-14 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                                src={(postDetails?.fundraiser as any)?.profilePicture}
                                alt="fundraiser profile picture"
                            />
                            <div className="ml-3 text-center lg:text-left">
                                <p className="text-xl font-semibold mb-2 text-gray-800">{(postDetails?.fundraiser as any)?.name}</p>
                                <p className="text-sm text-gray-500">{(postDetails?.fundraiser as any)?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments */}
                {postDetails && postDetails.isApproved !== 'pending' ? (
                    <PostComments postId={id} userId={userId} />
                ) : ("")}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-white'>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Supporting Document</ModalHeader>
                                <ModalBody>
                                    <img className='w-full' src={selectedImage || ''} alt="Supporting Document" />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </HelmetProvider>
    );
};

export default PostDetails;
