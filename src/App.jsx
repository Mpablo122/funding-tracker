import { useState, useEffect } from 'react';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';
import './App.css';

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/funding.json') // Corrected path
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setFundingData(data))
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Startup Funding Tracker</h1>
      <FundingBarChart data={fundingData} />
      <IndustryTrendChart data={fundingData} />
    </div>
  );
}

export default App;