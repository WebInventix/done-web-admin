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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyJobsChart = ({ monthlyData, themeBlue, themeOrange }) => {
  const months = Object.keys(monthlyData || {});
  const values = Object.values(monthlyData || {});

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Number of Jobs',
        data: values,
        backgroundColor: themeOrange + '80', // Adding transparency
        borderColor: themeOrange,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Jobs Overview',
        color: themeBlue,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyJobsChart;