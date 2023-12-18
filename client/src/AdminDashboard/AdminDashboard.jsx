import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Header from "./AdminHeader";
import Sidebar from "./AdminSidebar";
import "./App.css";

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Loan State
  const [allData, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectData, setRejectedData] = useState([]);

  // Card State

  const [allCardData, setCardData] = useState([]);
  const [pendingCardData, setCardPendingData] = useState([]);
  const [approvedCardData, setApprovedCardData] = useState([]);
  const [rejectCardData, setRejectedCardData] = useState([]);

  const fetchAlldata = async () => {
    try {
      let data = await fetch(
        `http://localhost:5000/api/fetchAdminAlldata?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`Error: ${data.status} - ${data.statusText}`);
      }

      let result = await data.json();
      setData(result);
      console.log("Data retrieved successfully:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchPendingData = async () => {
    const Status = "Pending";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getpendingadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setPendingData(result);
    } catch (error) {
      console.error("Error fetching pending data:", error.message);
    }
  };

  const fetchApprovedData = async () => {
    const Status = "Disbursed";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getdisbursedadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setApprovedData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching approved data:", error.message);
    }
  };

  const fetchRejectedData = async () => {
    const Status = "Rejected";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getrejectedadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setRejectedData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching rejected data:", error.message);
    }
  };

  // Set Admin card

  const fetchCardAlldata = async () => {
    try {
      let data = await fetch(
        `http://localhost:5000/api/fetchCardAdminAlldata?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`Error: ${data.status} - ${data.statusText}`);
      }

      let result = await data.json();
      setCardData(result);
      console.log("Data retrieved successfully:", result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchCardPendingData = async () => {
    const Status = "Pending";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getCardpendingadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setCardPendingData(result);
    } catch (error) {
      console.error("Error fetching pending data:", error.message);
    }
  };

  const fetchCardApprovedData = async () => {
    const Status = "Disbursed";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getCarddisbursedadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setApprovedCardData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching approved data:", error.message);
    }
  };

  const fetchCardRejectedData = async () => {
    const Status = "Rejected";

    try {
      let data = await fetch(
        `http://localhost:5000/api/getCardrejectedadmindatas/${Status}?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let result = await data.json();
      setRejectedCardData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching rejected data:", error.message);
    }
  };

  useEffect(() => {
    fetchAlldata();
    fetchPendingData();
    fetchApprovedData();
    fetchRejectedData();

    fetchCardAlldata();
    fetchCardPendingData();
    fetchCardApprovedData();
    fetchCardRejectedData();
  }, [selectedFilter]);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <div className="main-title">
          <h3 className="fs-3 text-dark ">Dashboard</h3>
        </div>

        {/* Dropdown for date filter */}
        <div>
          <select
            onChange={(e) => setSelectedFilter(e.target.value)}
            value={selectedFilter}
            className="select_date_filter"
          >
            <option value="from1to31" selected>
              Select Date Filter
            </option>
            <option value="lastday">From Last Day</option>
            <option value="last7days">From Last 7 Days</option>
            <option value="last30days">From Last 30 Days</option>
            <option value="all">All Data</option>
          </select>
        </div>

        <div className="main-cards">
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_loginlead">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">LOGIN LEADS</h3>
                <BsFillArchiveFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h3 className="text-white fs-3">{allData.length}</h3>
            </Link>
          </div>

          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_pending">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">PENDING</h3>
                <BsFillGrid3X3GapFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{pendingData.length}</h1>
            </Link>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_approved">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">DISBURSED</h3>
                <BsPeopleFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
            </Link>
            <h1 className="text-white fs-3">{approvedData.length}</h1>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_reject">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">REJECTED</h3>
                <BsFillBellFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{rejectData.length}</h1>
            </Link>
          </div>
        </div>

        <div className="main-title">
          <h3 className="fs-3 text-dark ">Credit Card</h3>
        </div>

        <div className="main-cards">
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_card_loginlead">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">LOGIN LEADS</h3>
                <BsFillArchiveFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h3 className="text-white fs-3">{allCardData.length}</h3>
            </Link>
          </div>

          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_card_pending">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">PENDING</h3>
                <BsFillGrid3X3GapFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{pendingCardData.length}</h1>
            </Link>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_card_approved">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">DISBURSED</h3>
                <BsPeopleFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
            </Link>
            <h1 className="text-white fs-3">{approvedCardData.length}</h1>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/admin_card_reject">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">REJECTED</h3>
                <BsFillBellFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{rejectCardData.length}</h1>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
