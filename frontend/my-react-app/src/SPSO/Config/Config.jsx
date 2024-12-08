import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Config.css";
import logoBK from "../../../../src/assets/logo_BK2-removebg.png";
import axios from "axios";
const Config = () => {
  const [defaultPages, setDefaultPages] = useState("");
  const [history, setHistory] = useState([]);

  const handleAllocate = async () => {
    if (!defaultPages) {
      toast.error("Please select pages", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newEntry = {
      num_of_pages: defaultPages,
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        "http://localhost:5000/api/spso/allocate-pages",
        newEntry,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Success allocate pages");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }

    toast.success("Pages allocated successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container-printer-management">
      <div className="config-container">
        {/* Header Section */}
        <div className="config-header">
          <div className="header-logo">
            <img src={logoBK} alt="BK Logo" className="bk-logo" />
          </div>
          <div className="header-title">
            <h1>Page Allocation Configuration</h1>
            <p>
              Manage page allocations efficiently with user-friendly settings.
            </p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="config-settings">
          <h2>Set Allocation</h2>
          <div className="config-input-group">
            <label htmlFor="defaultPages">Default Pages:</label>
            <input
              type="number"
              id="defaultPages"
              value={defaultPages}
              min="1"
              onChange={(e) => setDefaultPages(Number(e.target.value))}
              className="config-input"
            />
          </div>

          <button className="config-allocate-button" onClick={handleAllocate}>
            Allocate Pages
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Config;
