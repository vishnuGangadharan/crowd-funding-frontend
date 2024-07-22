import React, { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { getRequest } from "../../api/admin";
import { beneficiary } from "../../services/interface/interface";

const CampaignRequest: React.FC = () => {
  const [request, setRequest] = useState<beneficiary[]>([]); // Initial state as an empty array
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(["pending"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, " "),
    [selectedKeys]
  );

  const fetchRequest = async () => {
    try {
      const response = await getRequest();
      // Ensure response.data is an array
      // if (Array.isArray(response.data)) {
        setRequest(response.data.data);
      // } else {
        console.log("Expected :", response.data.data);
      // }
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="p-4 w-[80%]">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">No</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">Amount</th>
              <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">Last Date</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Documents</th>
              <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
             {request?.map((req, index) => (
              <tr key={index} className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200">
                <td className="py-3 px-4">{index + 1}</td> 
                <td className="py-3 px-4">{req?.name}</td>
                <td className="py-3 px-4">{req?.category}</td>
                <td className="py-3 px-4">{req?.email}</td>
                <td className="py-3 px-4">{req?.amount}</td>
                <td className="py-3 px-4">{req.targetDate}</td>
                <td className="py-3 px-4">view</td>
                <td className="py-3 px-4">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
                    >
                      <DropdownItem key="pending">pending</DropdownItem>
                      <DropdownItem key="approved">approved</DropdownItem>
                      <DropdownItem key="rejected">rejected</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignRequest;
