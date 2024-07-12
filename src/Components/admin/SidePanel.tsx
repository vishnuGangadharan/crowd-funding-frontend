import React from 'react'

const SidePanel = () => {
    return (
       
            <div className="h-[80%] w-64 bg-gray-800 text-white ml-10 mt-10 rounded-large">
                <div className="flex items-center justify-center h-16 bg-gray-900 text-xl font-bold rounded-large">
                    Admin Panel
                </div>
                <nav className="flex flex-col mt-4">
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        Dashboard
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        Users
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        Fundraisers
                    </div> 
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        Reports
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        Settings
                    </div>
                </nav>
            </div>
        
    )
}

export default SidePanel
