// import React, { useEffect, useState } from 'react';
// import { Carousel, Label } from "flowbite-react";
// import { Card, Progress, TextInput } from "flowbite-react";
// import { useParams } from 'react-router-dom';
// import { getPostDetails } from '../../api/user';
// import beneficiary from '@/services/interface/beneficiary';
// import parse from 'html-react-parser';
// import { Helmet } from "react-helmet";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
// import { FaShareSquare } from "react-icons/fa";
// import {
//     FacebookShareButton,
//     FacebookIcon,
//     TwitterShareButton,
//     TwitterIcon,
//     WhatsappShareButton,
//     WhatsappIcon
// } from "react-share";




// const PostDetails: React.FC = () => {
//     const { isOpen, onOpen, onOpenChange } = useDisclosure();
//     const [postDetails, setPostDetails] = useState<beneficiary>();
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);

//     //share
//     const url = window.location.href;
//     const title = postDetails?.heading as string
//     const image = postDetails?.profilePic ? postDetails.profilePic[0] : ""
//     const fullUrl = `${url}?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}`;



//     const { id } = useParams<{ id: string }>();

//     useEffect(() => {
//         const fetchPostDetails = async () => {
//             try {
//                 const response = await getPostDetails(id as string)
//                 setPostDetails(response.data)
//             } catch (error) {
//                 console.log("Error fetching fundraising details:", error);
//             }
//         }
//         fetchPostDetails()
//     }, [id]);

//     const handleImageClick = (img: string) => {
//         setSelectedImage(img);
//         onOpen();
//     };

//     return (
//         <div className="container mx-auto p-4 bg-gradient-to-r from-blue-300 via-green-200 to-teal-100">
//              {postDetails && (
//         <Helmet>
//           <meta property="og:url" content={window.location.href} />
//           <meta property="og:type" content="website" />
//           <meta property="og:title" content={postDetails.heading} />
//           <meta property="og:description" content={postDetails.bio} />
//           <meta property="og:image" content={postDetails.profilePic ? postDetails.profilePic[0] : "https://yourwebsite.com/default-image.jpg"} />
//         </Helmet>
//       )}
//             <div className="flex flex-col md:flex-row">
//                 {/* Left Column */}
//                 <div className="md:w-2/3 p-4 bg-white shadow-lg rounded-lg">
//                     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//                         <Carousel slideInterval={2000} className="rounded-lg">
//                             {postDetails?.profilePic?.map((img, indx) => (
//                                 <img src={img} key={indx} alt={`Slide ${indx + 1}`} />
//                             ))}
//                         </Carousel>
//                     </div>
//                     <h1 className="text-3xl font-bold mb-4 mt-12 text-center">{postDetails?.heading}</h1>
//                     <div className="text-gray-700 mb-4">
//                         {postDetails?.bio && parse(postDetails.bio)}
//                     </div >
//                     <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
//                         Read More
//                     </button>
//                     <div>
//                         <FacebookShareButton url={fullUrl} title={title}>
//                             <FacebookIcon size={32} round />
//                         </FacebookShareButton>

//                         <TwitterShareButton url={fullUrl} title={title}>
//                             <TwitterIcon size={32} round />
//                         </TwitterShareButton>


//                         <WhatsappShareButton url={fullUrl} title={title}>
//                             <WhatsappIcon size={32} round />
//                         </WhatsappShareButton>

//                         {/* Add other social media buttons as needed */}
//                     </div>

//                 </div>

//                 {/* Right Column */}
//                 <div className="md:w-1/3 p-4 bg-white shadow-lg rounded-lg md:ml-4 mt-4 md:mt-0">
//                     <Card href="#" className="w-full shadow-lg rounded-lg">
//                         <h3>Contribution Status</h3>
//                         <p>Target Amount :</p>
//                         <p>Current Contributed Amount :</p>
//                         <p>Balance :</p>
//                         <Progress
//                             progress={45}
//                             progressLabelPosition="inside"
//                             textLabel="contribution status"
//                             textLabelPosition="outside"
//                             size="lg"
//                             labelProgress
//                             labelText
//                         />
//                     </Card>
//                     <h2 className="text-2xl font-bold mb-4">Support Our Cause</h2>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2">Donation Amount</label>
//                         <input
//                             type="number"
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                             placeholder="Enter amount"
//                         />
//                     </div>
//                     <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full">
//                         Donate Now
//                     </button>

//                     {/* Card */}
//                     <Card className="max-w-sm mt-10">
//                         <div className="flex items-center justify-between">
//                             <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Donations</h5>
//                             <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">View all</p>
//                         </div>
//                         <div className="flow-root">
//                             <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//                                 <li className="pb-0 pt-3 sm:pt-4">
//                                     <div className="flex items-center space-x-4">
//                                         <div className="shrink-0">
//                                             {/* Profile image placeholder */}
//                                         </div>
//                                         <div className="min-w-0 flex-1">
//                                             <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
//                                             <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
//                                         </div>
//                                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//                                             $2367
//                                         </div>
//                                     </div>
//                                 </li>
//                                 <li className="pb-0 pt-3 sm:pt-4">
//                                     <div className="flex items-center space-x-4">
//                                         <div className="shrink-0">
//                                             {/* Profile image placeholder */}
//                                         </div>
//                                         <div className="min-w-0 flex-1">
//                                             <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
//                                             <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
//                                         </div>
//                                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//                                             $2367
//                                         </div>
//                                     </div>
//                                 </li>
//                                 <li className="pb-0 pt-3 sm:pt-4">
//                                     <div className="flex items-center space-x-4">
//                                         <div className="shrink-0">
//                                             {/* Profile image placeholder */}
//                                         </div>
//                                         <div className="min-w-0 flex-1">
//                                             <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
//                                             <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
//                                         </div>
//                                         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//                                             $2367
//                                         </div>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//             <div className="p-4 flex">
//                 <Card className="w-[50%] shadow-lg rounded-lg mr-10">
//                     <h3 className="text-xl font-semibold mb-4 text-center">Supporting Documents</h3>
//                     <div className='flex'>
//                         {postDetails?.supportingDocs?.map((img, indx) => (
//                             <div key={indx}>
//                                 <img onClick={() => handleImageClick(img)} className='w-20 cursor-pointer' src={img} alt={`Supporting Document ${indx + 1}`} />
//                             </div>
//                         ))}
//                     </div>
//                 </Card>
//                 <Card className="w-[30%] shadow-lg rounded-lg">
//                     <h3 className="text-xl font-semibold mb-4 text-center">Fundraiser Details</h3>
//                 </Card>
//             </div>
//             <Card className="mt-6 bg-white shadow-lg rounded-lg w-[50%] p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Add A Comment for Support</h3>
//                 <form>
//                     <div>
//                         <div className="mb-2 block">
//                             <Label htmlFor="email1" value="Your email" />
//                         </div>
//                         <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
//                     </div>
//                     <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300 w-full">
//                         Submit Comment
//                     </button>
//                 </form>
//             </Card>

//             <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-white'>
//                 <ModalContent>
//                     {(onClose) => (
//                         <>
//                             <ModalHeader className="flex flex-col gap-1">Supporting Document</ModalHeader>
//                             <ModalBody>
//                                 <img className='w-full' src={selectedImage || ''} alt="Supporting Document" />
//                             </ModalBody>
//                             <ModalFooter>
//                                 <Button color="danger" variant="light" onPress={onClose}>
//                                     Close
//                                 </Button>
//                             </ModalFooter>
//                         </>
//                     )}
//                 </ModalContent>
//             </Modal>
//         </div>
//     );
// };

// export default PostDetails;



import React, { useEffect, useState } from 'react';
import { Carousel, Label } from "flowbite-react";
import { Card, Progress, TextInput } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../../api/user';
import beneficiary from '@/services/interface/beneficiary';
import parse from 'html-react-parser';
import { Helmet } from "react-helmet";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaShareSquare } from "react-icons/fa";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const PostDetails: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [postDetails, setPostDetails] = useState<beneficiary>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await getPostDetails(id as string)
                setPostDetails(response.data)
            } catch (error) {
                console.log("Error fetching fundraising details:", error);
            }
        }
        fetchPostDetails()
    }, [id]);

    const handleImageClick = (img: string) => {
        setSelectedImage(img);
        onOpen();
    };

    const shareUrl = `https://yourdeployedsite.com/postdetails/${id}`;
    const title = postDetails?.heading || "Default Title";
    const description = postDetails?.bio || "Default Description";
    const image = postDetails?.profilePic ? postDetails.profilePic[0] : "https://yourwebsite.com/default-image.jpg";

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-blue-300 via-green-200 to-teal-100">
            {postDetails && (
                <Helmet>
                    <meta property="og:url" content={shareUrl} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={image} />
                </Helmet>
            )}
            <div className="flex flex-col md:flex-row">
                {/* Left Column */}
                <div className="md:w-2/3 p-4 bg-white shadow-lg rounded-lg">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel slideInterval={2000} className="rounded-lg">
                            {postDetails?.profilePic?.map((img, indx) => (
                                <img src={img} key={indx} alt={`Slide ${indx + 1}`} />
                            ))}
                        </Carousel>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 mt-12 text-center">{postDetails?.heading}</h1>
                    <div className="text-gray-700 mb-4">
                        {postDetails?.bio && parse(postDetails.bio)}
                    </div >
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Read More
                    </button>
                    <div>
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} title={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <WhatsappShareButton url={shareUrl} title={title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        {/* Add other social media buttons as needed */}
                    </div>

                </div>

                {/* Right Column */}
                <div className="md:w-1/3 p-4 bg-white shadow-lg rounded-lg md:ml-4 mt-4 md:mt-0">
                    <Card href="#" className="w-full shadow-lg rounded-lg">
                        <h3>Contribution Status</h3>
                        <p>Target Amount :</p>
                        <p>Current Contributed Amount :</p>
                        <p>Balance :</p>
                        <Progress
                            progress={45}
                            progressLabelPosition="inside"
                            textLabel="contribution status"
                            textLabelPosition="outside"
                            size="lg"
                            labelProgress
                            labelText
                        />
                    </Card>
                    <h2 className="text-2xl font-bold mb-4">Support Our Cause</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Donation Amount</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full">
                        Donate Now
                    </button>

                    {/* Card */}
                    <Card className="max-w-sm mt-10">
                        <div className="flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Donations</h5>
                            <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">View all</p>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="pb-0 pt-3 sm:pt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            {/* Profile image placeholder */}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $2367
                                        </div>
                                    </div>
                                </li>
                                <li className="pb-0 pt-3 sm:pt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            {/* Profile image placeholder */}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $2367
                                        </div>
                                    </div>
                                </li>
                                <li className="pb-0 pt-3 sm:pt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            {/* Profile image placeholder */}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $2367
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="p-4 flex">
                <Card className="w-[50%] shadow-lg rounded-lg mr-10">
                    <h3 className="text-xl font-semibold mb-4 text-center">Supporting Documents</h3>
                    <div className='flex'>
                        {postDetails?.supportingDocs?.map((img, indx) => (
                            <div key={indx}>
                                <img onClick={() => handleImageClick(img)} src={img} key={indx} alt={`Supporting Document ${indx + 1}`} className="h-24 w-24 m-1 object-cover cursor-pointer" />
                            </div>
                        ))}
                    </div>
                </Card>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} motionProps={{ transition: { duration: 0.2 } }} className="p-4 rounded-lg">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Document</ModalHeader>
                                <ModalBody>
                                    {selectedImage && (
                                        <img src={selectedImage} alt="Selected Supporting Document" className="h-auto w-full object-cover" />
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose} className="mr-2">Close</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Card className="w-[50%] shadow-lg rounded-lg mr-10">
                    <h3 className="text-xl font-semibold mb-4 text-center">Supporting Videos</h3>
                    <div className="flex">
                        {postDetails?.supportingVideos?.map((videoUrl, indx) => (
                            <div key={indx} className="h-24 w-24 m-1">
                                <video controls className="w-full h-full object-cover">
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div >
    );
}

export default PostDetails;
