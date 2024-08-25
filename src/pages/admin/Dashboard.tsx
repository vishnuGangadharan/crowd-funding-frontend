
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"


import { LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]
 function Dashboard() {
  return (
    <div>
   <div className="w-[50%] h-auto m-9 flex justify-evenly">
  <div>
    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg">Current Campaigns</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
    </Card>

    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg">Completed</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">10</p>
    </Card>
  </div>
  <div>
    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg text-center">This Month Campaign Requests</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">7</p>
    </Card>

    <Card className="flex flex-col justify-center items-center w-64 h-32 m-5 bg-gray-100 shadow-lg rounded-lg">
      <p className="font-semibold text-gray-700 text-lg text-center">Company Profit</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">100,000</p>
    </Card>
  </div>
</div>


<BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name"   width={100}/>
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" fill="#8884d8" barSize={15}/>
</BarChart>


    </div>
  )
}

export default Dashboard
