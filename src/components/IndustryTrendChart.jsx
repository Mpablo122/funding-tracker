import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function IndustryTrendChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>;

  // Group funding data by industry and year
  const industryData = {};
  data.forEach((item) => {
    const { industry, year, funding } = item;
    if (!industryData[industry]) {
      industryData[industry] = {};
    }
    industryData[industry][year] = (industryData[industry][year] || 0) + funding;
  });

  const years = [...new Set(data.map((item) => item.year))].sort();
  const datasets = Object.keys(industryData).map((industry) => {
    const fundingByYear = years.map((year) => industryData[industry][year] || 0);
    return {
      label: industry,
      data: fundingByYear,
      fill: false,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
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
  };

  return (
    <div>
      <h2>Funding Trends by Industry</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default IndustryTrendChart;