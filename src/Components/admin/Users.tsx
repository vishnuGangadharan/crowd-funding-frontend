import React, { useEffect, useState } from 'react';
import { fetchUsers, handleBlockStatus } from '../../api/admin';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersDetails = async () => {
    try {
      const response = await fetchUsers();
      console.log("response", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUsersDetails();
  }, []);

  const handleBlockUser = async (id: string, isBlocked: boolean) => {
    try {
      const response = await handleBlockStatus(id, !isBlocked);
      if (response) {
        fetchUsersDetails();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className='bg-slate-700 h-[80%] mt-10 ml-6 mr-10 w-full rounded-lg p-4'>
        <h1 className='text-white text-lg'>Users List</h1>
      <div className="w-full bg-gray-400 rounded-lg">
        <table className="min-w-full text-red">
          <thead>
            <tr className="bg-slate-900 text-xl font-bold">
              <th className="px-4 py-2 text-center">No</th>
              <th className="px-4 py-2 text-center">Profile Pic</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Fundraiser</th>
              <th className="px-4 py-2 text-center">Block</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="bg-slate-800">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  <img src={item.profilePic || '../User/profilepic.png'} alt="Profile" className="w-8 h-8 rounded-full mx-auto" />
                </td>
                <td className="px-4 py-2 text-center">{item.name || 'John Doe'}</td>
                <td className="px-4 py-2 text-center">{item.email || 'john@example.com'}</td>
                <td className="px-4 py-2 text-center">{item.isFundraiser ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() => handleBlockUser(item._id, item.isBlocked)}
                  >
                    {item.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
