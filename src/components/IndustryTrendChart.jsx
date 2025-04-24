import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function IndustryTrendChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>;

  // Group funding data by industry and year
  const industryData = {};
  data.forEach((item) => {
    const { industry, year, amount } = item; // Use 'amount' instead of 'funding'
    if (!industryData[industry]) {
      industryData[industry] = {};
    }
    industryData[industry][year] = (industryData[industry][year] || 0) + amount;
  });

  const years = [...new Set(data.map((item) => item.year))].sort();
  const datasets = Object.keys(industryData).map((industry) => {
    const fundingByYear = years.map((year) => industryData[industry][year] || 0);
    return {
      label: industry,
      data: fundingByYear,
      fill: false,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      tension: 0.3, // Add smooth curves
    };
  });

  const chartData = {
    labels: years,
    datasets,
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
          text: 'Funding (in USD)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Funding Trends by Industry</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;