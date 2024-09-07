import { actionOnFundRequest, getFundRequest } from '@/api/admin';
import beneficiary from '@/services/interface/beneficiary';
import React, { useEffect } from 'react';
import { formatDate } from '@/services/functions/Functions';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '@/Components/admin/ConfirmationModal';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";


const FundRequest: React.FC = () => {

  const [fetchData, setFetchData] = React.useState<beneficiary[]>([])
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const navigate = useNavigate();

  const getFundRequests = async () => {
    const response = await getFundRequest(currentPage)
    console.log('response', response.data);
    
    setFetchData(response.data.request)
    setTotalPages(response.data.totalPages)

  }

  const handleFundRequest = async (id: string | undefined) => {
    try {
      const response = await actionOnFundRequest(id)
      console.log('response', response);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFundRequests()
  }, [currentPage])

  const handleView = (id: string | undefined) => {
    navigate(`/admin/postDetails/${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 p-4">
      {fetchData && fetchData.length > 0 ?(
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {fetchData.map((data, index) => (
          <div key={index} className="bg-white w-auto flex justify-center items-center shadow-lg rounded-xl overflow-hidden">
            <div className="">
              {/* Image placeholder */}
              <img src={data && data.profilePic ? data?.profilePic[0] : ''} className=' w-32 h-32 bg-cover' alt="" />
            </div>
            <div className="p-6 ">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Name : {data.name}</h4>
                  <h4 className="text-sm text-gray-500">Age : {data.age}</h4>
                  <p className="text-sm text-gray-500">Gender: {data.gender}</p>

                </div>
                <div>
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">Category : {data.category}</span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Start Date: {formatDate(data.createdAt)}</p>
                <p className="text-sm text-gray-500">Finish Date: {formatDate(data.targetDate)}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm font-medium">Amount Required:</p>
                  <p className="text-lg font-semibold text-red-500">₹{data.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contributed Amount: </p>
                  <p className="text-lg font-semibold text-green-600">₹{data.contributedAmount}</p>
                </div>
              </div>
              <p className=''>Target amount Achieved : {data.amount === data.contributedAmount ? "true" : "false"}</p>
              <div className='flex'>
                <button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7]  hover:to-blue-gray-400 shadow-lg text-small text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => handleView(data._id)}
                >
                  Post Details
                </button>
                {data.fundRequestConfirmed == true ? (
                  <p className='ml-3 mt-1 text-red-500 font-semibold'>completed</p>) : (
                  <ConfirmationModal
                    buttonText={'Confirm'}
                    title={`Are you sure you want to  confirm to grand fund for this user?`}
                    message={'confirm funding'}
                    onConfirm={() => handleFundRequest(data._id)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

      
      </div>
      ) : (<p className="flex justify-center text-center font-semibold mt-10 text-2xl">
        No request found
      </p>)}
      {fetchData.length > 2 ? (
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
      ): ('')}
    </div>
  );
};

export default FundRequest;
