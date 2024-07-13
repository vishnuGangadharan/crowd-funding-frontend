import React from 'react'




const Dashboard = () => {


  // const fetchUsers = async()=>{
  //   try{
  //     const response = await getUsers()
  //   }
  // }



  return (
    <div className='bg-slate-700 h-[80%] mt-10 ml-6 mr-10 w-full rounded-lg p-4'>
            <div className="w-full bg-slate-900 rounded-lg">
                <table className="min-w-full text-white">
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
                        {/* Add your table rows here */}
                        <tr className="bg-slate-800">
                            <td className="px-4 py-2 text-center">1</td>
                            <td className="px-4 py-2 text-center">Image</td>
                            <td className="px-4 py-2 text-center">John Doe</td>
                            <td className="px-4 py-2 text-center">john@example.com</td>
                            <td className="px-4 py-2 text-center">Fundraiser 1</td>
                            <td className="px-4 py-2 text-center">Block</td>
                        </tr>
                        {/* Repeat similar rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>

  )
}

export default Dashboard
