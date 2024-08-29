import  { useEffect, useState } from 'react';
import beneficiary from '@/services/interface/beneficiary';
import { getPostDetails } from '../../api/admin';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import parse from 'html-react-parser';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const PostDetails = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [postDetails, setPostDetails] = useState<beneficiary>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await getPostDetails(id as string);
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

    const handleImageClick = (img: string) => {
        setSelectedImage(img);
        onOpen();
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg h-screen overflow-y-auto">
            <button
                onClick={handleGoBack}
                className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center"
            >
                <AiOutlineArrowLeft className="mr-2" /> Go Back
            </button>

            <div className="flex flex-col md:flex-row md:gap-6">
                <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
                    {postDetails && postDetails.fundraiser ? (
                        <div>
                            <h3 className='text-xl font-semibold mb-2'>Fundraiser Details</h3>
                            <p className='text-gray-700'><strong>Name:</strong> {postDetails.fundraiser.name}</p>
                            <p className='text-gray-700'><strong>Email:</strong> {postDetails.fundraiser.email}</p>
                            <h2 className='text-lg font-semibold mt-5'>Beneficiary Details</h2>
                            <p className='text-gray-700'><strong>Name:</strong> {postDetails.name}</p>
                            <p className='text-gray-700'><strong>Age:</strong> {postDetails.age}</p>
                            <p className='text-gray-700'><strong>Email:</strong> {postDetails.email}</p>
                            <p className='text-gray-700'><strong>Phone:</strong> {postDetails.phone}</p>
                            <p className='text-gray-700'><strong>PAN NO:</strong> {postDetails.panNumber}</p>
                            <p className='text-gray-700'><strong>Aadhar NO:</strong> {postDetails.userAadharNumber}</p>
                            <p className='text-gray-700'><strong>Category:</strong> {postDetails.category}</p>
                            {postDetails.category === "education" ? (
                                <div>
                                    <p className='text-gray-700'><strong>Institute Address:</strong></p>
                                    <p>{postDetails.educationDetails?.instituteName}</p>
                                    <p>{postDetails.educationDetails?.instituteDistrict}</p>
                                    <p>{postDetails.educationDetails?.institutePostalAddress}</p>
                                    <p>{postDetails.educationDetails?.instituteState}</p>
                                    <p>{postDetails.educationDetails?.institutePin}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className='text-gray-700'><strong>Hospital Address:</strong></p>
                                    <p>{postDetails.medicalDetails?.hospitalName}</p>
                                    <p>{postDetails.medicalDetails?.hospitalPostalAddress}</p>
                                    <p>{postDetails.medicalDetails?.hospitalState}</p>
                                    <p>{postDetails.medicalDetails?.hospitalPin}</p>
                                </div>
                            )}

                            <div className='mt-4'>
                                <p>Heading : {postDetails.heading}</p>
                                {postDetails.bio && parse(postDetails.bio)}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-700">Loading...</p>
                    )}
                </div>

                <Card className="md:w-1/2 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Supporting Pictures</h2>
                            <div className="flex flex-wrap gap-4">
                                {postDetails?.profilePic && postDetails.profilePic.map((item, index) => (
                                    <div key={index} className="relative w-28 h-28">
                                        <img
                                            src={item}
                                            alt={`Profile Pic ${index}`}
                                            className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                                            onClick={() => handleImageClick(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Supporting Documents</h2>
                            <div className="flex flex-wrap gap-4">
                                {postDetails?.supportingDocs && postDetails.supportingDocs.map((item, index) => (
                                    <div key={index} className="relative w-28 h-28">
                                        <img
                                            src={item}
                                            alt={`Supporting Doc ${index}`}
                                            className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                                            onClick={() => handleImageClick(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

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
        </div>
    );
};

export default PostDetails;
