

import React, { useEffect, useState } from 'react';
import { fetchUsers, handleBlockStatus } from '../../api/admin';
import { Spinner } from '@nextui-org/react';
import ConfirmationModal from './ConfirmationModal';
const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');



  const fetchUsersDetails = async () => {
    try {

      const response = await fetchUsers(page, limit, searchTerm);
      setUsers(response.data.data);
      setTotal(response?.data.total)
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersDetails();
  }, [page, searchTerm]);

  const handleBlockUser = async (id: string, isBlocked: boolean) => {
    try {
      const response = await handleBlockStatus(id, !isBlocked);


      if (response) {
       setUsers((prev) => 
      prev.map((user) => 
      user._id == id ? { ...user, isBlocked : !isBlocked} : user
      )
      )
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleNextPage = () => {
    if (page < total) {
      setPage(page + 1);
    }
  }

  return (
    <div className='bg-slate-100 h-auto mt-10 mx-auto p-6 w-[90%] rounded-lg shadow-lg'>
      <h1 className='text-gray-800 text-2xl mb-6 font-semibold text-center'>Users List</h1>
      <div className='mt-1 ml-16 w-[250px] flex'>
        <input
          placeholder="Search"
          onChange={handleSearch}
          value={searchTerm}
          className="w-[250px] h-10 border-2 rounded-full p-3 focus:outline-none focus:ring-2 focus:to-blue-gray-500 mb-7"
        />

      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-400 rounded-lg shadow-md">
            <thead>
              <tr className="bg-slate-900 text-black text-lg font-semibold">
                <th className="px-6 py-4 text-center">No</th>
                <th className="px-6 py-4 text-center">Profile Pic</th>
                <th className="px-6 py-4 text-center">Name</th>
                <th className="px-6 py-4 text-center">Email</th>
                <th className="px-6 py-4 text-center">Fundraiser</th>
                <th className="px-6 py-4 text-center">Block</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100 transition duration-300">
                  <td className="px-6 py-4 text-center border-b">{index + 1}</td>
                  <td className="px-6 py-4 text-center border-b">
                    <img src={item.profilePicture ? item.profilePicture : 'https://www.w3schools.com/w3images/avatar2.png'} alt="Profile" className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center border-b">{item.name}</td>
                  <td className="px-6 py-4 text-center border-b">{item.email}</td>
                  <td className="px-6 py-4 text-center border-b">{item.isFundraiser ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-center border-b">

                    <ConfirmationModal
                      buttonText={item.isBlocked ? "Unblock User" : "Block User"}
                      title={`Are you sure you want to ${item.isBlocked ? "unblock" : "block"} this user?`}
                      message={`${item.isBlocked
                        ? "Unblocking this user will restore their access to the platform."
                        : "Blocking this user will prevent them from accessing the platform."
                        }`}
                      onConfirm={() => handleBlockUser(item._id, item.isBlocked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className='flex justify-center pt-7'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &#9664;
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * limit >= total}
          className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}

export default Users;



