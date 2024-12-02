import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import "./Statistic.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistic = () => {
  const [monthlyData, setMonthlyData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Prints",
        data: Array(12).fill(0), // Default data with zeros
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const [yearlyData, setYearlyData] = useState({
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Yearly Prints",
        data: [0, 0, 0, 0, 1100],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  // Fetch data from API
  const fetchMonthlyData = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:5000/api/report/month", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data[0]; // Assuming the response is an array with the first object containing data
      const totalFor2024 = [
        data.jan,
        data.feb,
        data.mar,
        data.apr,
        data.may,
        data.jun,
        data.jul,
        data.aug,
        data.sep,
        data.oct,
        data.nov,
        data.dec,
      ].reduce((acc, value) => acc + parseInt(value, 10), 0);
      // Update the monthlyData state with API response
      setMonthlyData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [
              data.jan,
              data.feb,
              data.mar,
              data.apr,
              data.may,
              data.jun,
              data.jul,
              data.aug,
              data.sep,
              data.oct,
              data.nov,
              data.dec,
            ],
          },
        ],
      }));
      setYearlyData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [0, 0, 0, 0, totalFor2024],
          },
        ],
      }));
    } catch (err) {
      console.error("Error fetching monthly data:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  // Common options for both charts
  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Ensure the Y-axis starts at 0
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="statistic-container">
      <h1 className="statistic-header">Printing Statistics</h1>
      <div className="chart-container">
        <div className="chart-section" style={{ height: "400px" }}>
          <h2>Monthly Overview</h2>
          <Line data={monthlyData} options={chartOptions} />
        </div>
        <div className="chart-section" style={{ height: "400px" }}>
          <h2>Yearly Overview</h2>
          <Bar data={yearlyData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
