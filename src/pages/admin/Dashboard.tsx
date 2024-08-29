
import {
  Card,
} from "@/Components/ui/card"
import MyBarChart from "./Bar"
import { getDashboardData } from "@/api/admin";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { allData } from "@/services/interface/beneficiary";
const Dashboard: React.FC = () => {

  const [AllData, setAllData] = useState<allData | null>(null); 
  const DashboardData = async () => {
    try {
      const response = await getDashboardData();
      setAllData(response.data);
    }catch (error) {
      console.log(error);
      };
    }
      
    useEffect(()=>{
      DashboardData();
    },[])
  


  return (
    <div>
   <div className="w-[50%] h-auto m-9 flex justify-evenly">
  <div>
    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg">Current Campaigns</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.totalPosts}</p>
    </Card>

    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg">Completed</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.completedPosts}</p>
    </Card>
  </div>
  <div>
    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg text-center">This Month Campaign Requests</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.postsThisMonth}</p>
    </Card>

    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg text-center">Company Profit</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.totalProfit.totalProfit}</p>
    </Card>
  </div>
</div>

<div className="w-[50%]">

{AllData && <MyBarChart barChart={AllData.beneficiary} />}</div>
<div className="w-[50%]">
  <LineChart  lineChart ={AllData?.totalProfit}/>
</div>

    </div>
  )
}

export default Dashboard
