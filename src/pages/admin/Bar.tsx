import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from 'chart.js';
import beneficiary from '@/services/interface/beneficiary';

// Register the required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MyBarChartProps {
  barChart: beneficiary[]
}

const MyBarChart: React.FC<MyBarChartProps> = ({ barChart }) => {
  
  const labels = barChart.map(b => b.name);
  const dataValues = barChart.map(b => {
    if (b.amount === 0 || b.contributedAmount === undefined) {
      return 0;
    }
    return (Number(b.contributedAmount) / Number(b.amount)) * 100;
  });
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Beneficiary Dataset',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks:{
          stepSize:10
        }
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;
