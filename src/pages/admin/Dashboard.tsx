import { Card } from "@/Components/ui/card";
import MyBarChart from "./Bar";
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of current campaigns and performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="flex flex-col justify-center items-center h-32 bg-white hover:bg-blue-100 transition duration-300 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-700 text-lg">Current Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.totalPosts}</p>
        </Card>

        <Card className="flex flex-col justify-center items-center h-32 bg-white hover:bg-blue-100 transition duration-300 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-700 text-lg">Completed</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.completedPosts}</p>
        </Card>

        <Card className="flex flex-col justify-center items-center h-32 bg-white hover:bg-blue-100 transition duration-300 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-700 text-lg text-center">This Month Campaign Requests</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.postsThisMonth}</p>
        </Card>

        <Card className="flex flex-col justify-center items-center h-32 bg-white hover:bg-blue-100 transition duration-300 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-700 text-lg text-center">Company Profit</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{AllData?.totalProfit.totalProfit}</p>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Beneficiary Distribution</h2>
          {AllData && <MyBarChart barChart={AllData.beneficiary} />}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Profit Over Time</h2>
          <LineChart lineChart={AllData?.totalProfit} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
