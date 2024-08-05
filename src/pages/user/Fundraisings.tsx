import React, { useEffect, useState } from 'react';
import { fundraising } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { beneficiary } from '../../services/interface/interface';
import { useNavigate } from 'react-router-dom';

const Fundraising: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userID = userInfo?._id;

  const navigate = useNavigate();
  const [fundraisings, setFundraisings] = useState<beneficiary[]>([]);

  const fetchMyFundraisings = async () => {
    try {
      const response = await fundraising(userID);
      console.log("response", response);
      setFundraisings(response.data);
    } catch (error) {
      console.error("Error fetching fundraisings:", error);
    }
  };

  useEffect(() => {
    fetchMyFundraisings();
  }, []);

  return (
    <div className='flex flex-col items-center   min-h-screen bg-gray-50 py-6'>
      <div className="w-full max-w-4xl p-4 mt-6 bg-white shadow-lg rounded-md">
        {fundraisings.length > 0 ? (
          fundraisings.map((fundraising, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center justify-between mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/postdetails/${fundraising._id}`)}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={fundraising.profilePic?.[0]?.toString() || ''}
                  alt={`${fundraising.name}'s profile`}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 mr-4"
                />
                <div>
                  <p className="font-bold text-lg text-gray-800">{fundraising.name}</p>
                  <p className="text-sm text-gray-600">{fundraising.email}</p>
                  <p className="text-sm text-gray-600">{fundraising.phone}</p>
                </div>
              </div>
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
