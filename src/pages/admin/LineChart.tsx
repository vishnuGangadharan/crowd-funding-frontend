// src/components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { profit } from '@/services/interface/beneficiary';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  lineChart: profit | undefined;
}

const LineChart: React.FC<LineChartProps> = ({ lineChart }) => {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  const dataArray = Array(daysInMonth).fill(0);

  lineChart?.transactions.forEach(transaction => {
    if (transaction.date) {
      const transactionDate = new Date(transaction.date);
      const transactionDay = transactionDate.getDate(); 
      if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
        dataArray[transactionDay - 1] += transaction.amount; 
      }
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Profit',
        data: dataArray,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Profit',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0, 
        max: 70000, 
        ticks: {
          stepSize: 10000, 
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
