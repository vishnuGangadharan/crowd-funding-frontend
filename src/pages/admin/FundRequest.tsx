import { getFundRequest } from '@/api/admin';
import beneficiary from '@/services/interface/beneficiary';
import React, { useEffect } from 'react';
import {formatDate} from '@/services/functions/Functions';
import { useNavigate } from 'react-router-dom';
const FundRequest: React.FC = () => {

    const [fetchData,setFetchData] = React.useState<beneficiary[]>([])
    const navigate = useNavigate();

  const getFundRequests = async() =>{
    const response = await getFundRequest()
    setFetchData(response.data)
    console.log('response',response);
    
  }

  useEffect(()=>{
    getFundRequests()
  },[])

  const handleView = (id:string | undefined) => {
    navigate(`/admin/postDetails/${id}`);
  };
  return (
    <div className="min-h-screen  bg-gray-100 p-4">
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {fetchData.map((data, index) => (
        <div key={index} className="bg-white w-auto flex justify-center items-center shadow-lg rounded-xl overflow-hidden">
          <div className="h-48">
            {/* Image placeholder */}
            <img src={data && data.profilePic? data?.profilePic[0]: ''} className='ml-2 w-auto h-auto bg-cover bg-center' alt="" />
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
            <p  className=''>Target amount Achieved : {data.amount === data.contributedAmount ?  "true" : "false"}</p>
            <button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7]  hover:to-blue-gray-400 shadow-lg text-small text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => handleView(data._id)}
            >
              Post Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FundRequest;
