import React, { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { getRequest, postApproval } from "../../api/admin";
import { beneficiary } from "../../services/interface/interface";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const CampaignRequest: React.FC = () => {
  const [request, setRequest] = useState<beneficiary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate()
  const handleApprove = async (postId: string, status: string) => {
    try {
      const response = await postApproval(postId, status);
      if (response && response.status === 200) {
        toast.success(response.data.message);
        setRequest(prevRequests =>
          prevRequests.map(req =>
            req._id === postId ? { ...req, isApproved: status } : req
          )
        );
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await getRequest(currentPage);
      setTotalPages(response.data.data.totalPages);
      setRequest(response.data.data.request);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [currentPage]);

  const handleView = (id:string | undefined) => {
    navigate(`/admin/postDetails/${id}`);
  };

  const handlePreviousPage = () =>{
    if(currentPage >1){
      setCurrentPage((prev) => prev -1)
    }
  }

  const handleNextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <div className=" w-full ml-4 mr-5 mt-10">
      <h1 className="text-gray-800 text-2xl mb-6 font-semibold text-center">Campaign Request</h1>
      <div className="overflow-x-auto">
      {request && request.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">No</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">Name</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">Category</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-left">Email</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">Amount</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-left">Last Date</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">Documents</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-left">Status</th>
            </tr>
          </thead>
            
          <tbody className="text-gray-700">
            {request?.map((req, index) => {
              const formattedDate = new Date(req.targetDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <tr key={index} className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200">
                  <td className="py-3 px-4 text-left">{index + 1}</td>
                  <td className="py-3 px-4 text-left">{req?.name}</td>
                  <td className="py-3 px-4 text-left">{req?.category}</td>
                  <td className="py-3 px-4 text-left">{req?.email}</td>
                  <td className="py-3 px-4 text-left">{req?.amount}</td>
                  <td className="py-3 px-4 text-left">{formattedDate}</td>
                  <td className="py-3 px-4 text-left cursor-pointer" onClick={()=>handleView(req._id)}>view</td>
                  <td className="py-3 px-4 text-left">
                    {req.isApproved === 'pending' ? (
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" className="capitalize">
                            {req.isApproved}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          onSelectionChange={(keys) => {
                            const newStatus = Array.from(keys).join(", ");
                            handleApprove(req._id!, newStatus);
                          }}
                        >
                          <DropdownItem key="pending">pending</DropdownItem>
                          <DropdownItem key="approved">approved</DropdownItem>
                          <DropdownItem key="rejected">rejected</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <span  style={{
                        color: req.isApproved === "approved" ? "green" : req.isApproved === "rejected" ? "red" : "black",
                      }}
                      >{req.isApproved}</span>
                    )}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
          ): (<p className="flex justify-center text-center font-semibold mt-10 text-2xl">
           No request found
          </p>)}
      </div>
      {request.length > 0 ? (
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
          ): ''} 
    </div>
  );
};

export default CampaignRequest;
