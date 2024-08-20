import React, { useEffect, useState } from 'react';
import { fundraising, makeFundRequest } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { beneficiary } from '../../services/interface/interface';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Fundraising: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userID = userInfo?._id;

  const navigate = useNavigate();
  const [fundraisings, setFundraisings] = useState<beneficiary[]>([]);
  const [reload,setReload] = useState(false);

  const fetchMyFundraisings = async () => {
    try {
      const response = await fundraising(userID);
      console.log("response", response);
      setFundraisings(response.data);
    } catch (error) {
      console.error("Error fetching fundraisings:", error);
    }
  };


  const handleFundRequest = async(id : string | undefined)=>{
    console.log('iddddd',id);
    const response = await makeFundRequest(id)
    console.log('ssssssss',response);
    
    if(response?.status == 200){
      setReload(reload => !reload)
      toast.success(response.data.message)
    }
    console.log(response);
    
  }

  useEffect(() => {
    fetchMyFundraisings();
  }, [reload]);
  

  return (
    <div className='flex flex-col items-center   min-h-screen bg-gray-50 py-6'>
      <div className="w-full max-w-2xl p-4 mt-6 bg-white shadow-lg rounded-md">
        {fundraisings.length > 0 ? (
          fundraisings.map((fundraising, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center justify-between mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              // onClick={() => navigate(`/postdetails/${fundraising._id}`)}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={fundraising.profilePic?.[0]?.toString() || ''}
                  alt={`${fundraising.name}'s profile`}
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 mr-4"
                />
                <div>
                  <p className="font-bold text-lg text-gray-800">{fundraising.name}</p>
                  <p className="text-sm text-gray-600">{fundraising.email}</p>
                  <p className="text-sm text-gray-600">{fundraising.phone}</p>
                  <p onClick={() => navigate(`/postdetails/${fundraising._id}`)} className="text-sm text-blue-700"> View Details...</p>
                </div>
              </div>
              {fundraising && fundraising.isApproved== 'approved' ? (
              <button className={`${fundraising.requestedAmount ? 'bg-green-300 hover:bg-green-700' : 'bg-red-300  hover:bg-red-700'} text-black font-bold py-2 px-4 rounded-full`}
              onClick={() => handleFundRequest(fundraising._id)}
              >
                {fundraising && fundraising.requestedAmount ? 'Request send' : 'Request fund'}
              </button>
            ) : ('')}


              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md shadow-sm ${fundraising.isApproved === 'approved' ? 'bg-green-500' : fundraising.isApproved === 'pending' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}
                >
                  {fundraising.isApproved}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No fundraisings available.</p>
        )}
      </div>
    </div>
  );
};

export default Fundraising;
