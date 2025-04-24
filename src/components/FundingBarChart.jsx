import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function FundingBarChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>;

  // Calculate total funding by year
  const fundingByYear = data.reduce((acc, item) => {
    const year = item.year;
    acc[year] = (acc[year] || 0) + item.funding;
    return acc;
  }, {});

  const years = Object.keys(fundingByYear).sort();
  const fundingAmounts = years.map((year) => fundingByYear[year]);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total Funding by Year',
        data: fundingAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Funding (in USD)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Total Funding by Year</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FundingBarChart;