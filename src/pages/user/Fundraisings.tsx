import React, { useEffect, useState } from 'react';
import { fundraising } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { beneficiary } from '../../services/interface/interface';
import { useNavigate } from 'react-router-dom';



const Fundraising: React.FC = () => {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userID= userInfo?._id;

    const navigate = useNavigate()
   
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
    <div className="p-4 mt-6 ml-10 bg-gray-100 shadow-md rounded-md w-[80%] ">
  {fundraisings.length > 0 ? (
    fundraisings.map((fundraising, index) => (
      <div key={index} className="flex items-center justify-between mb-4 p-4 bg-white rounded-md shadow-sm cursor-pointer drop-shadow-lg">
        <div className="flex items-center">
          <img
            src={fundraising.profilePic?.[0]?.toString() || ''}
            alt={`${fundraising.name}'s profile`}
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 mr-4"
          />
          <div>
            <p className="font-bold text-lg">{fundraising.name}</p>
            <p className="text-sm text-gray-600">{fundraising.email}</p>
            <p className="text-sm text-gray-600">{fundraising.phone}</p>
          </div>
        </div>
        <button className='px-4 py-2 bg-red-500 text-white rounded-md shadow-sm' onClick={() => navigate(`/postdetails/${fundraising._id}`) }>view</button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm"
        >
          {fundraising.isApproved}
        </button>
      </div>
    ))
  ) : (
    <p>No fundraisings available.</p>
  )}
</div>

  );
};

export default Fundraising;
