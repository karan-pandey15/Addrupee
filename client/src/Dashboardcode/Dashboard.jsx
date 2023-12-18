import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./App.css";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Loan States
  const [allData, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectData, setRejectedData] = useState([]);

  // Card States
  const [cardAllData, setCardAllData] = useState([]);
  const [cardPendingData, setCardPendingData] = useState([]);
  const [cardApprovedData, setCardApprovedData] = useState([]);
  const [cardRejectData, setCardRejectedData] = useState([]);

  let email = localStorage.getItem("employeeEmail");

  // Loan Fetch Data
  const fetchAlldata = async () => {
    console.log("this is email", email);
    let data = await fetch(
      `http://localhost:5000/api/pendingdata/${email}?filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setData(result);
    console.log("the result is ", result);
    console.log("this is state", allData);
  };

  const fetchPendingData = async () => {
    const Status = "Pending";

    let data = await fetch(
      `http://localhost:5000/api/getpendingdatas/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setPendingData(result);
  };

  const fetchApprovedData = async () => {
    const Status = "Disbursed";
    let data = await fetch(
      `http://localhost:5000/api/approved-data/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setApprovedData(result);
    console.log(result);
  };

  const fetchRejectedData = async () => {
    const Status = "Rejected";
    let data = await fetch(
      `http://localhost:5000/api/rejected-data/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setRejectedData(result);
    console.log(result);
  };

  // Fetch Card Data
  const fetchCardAlldata = async () => {
    console.log("this is email", email);
    let data = await fetch(
      `http://localhost:5000/api/card_pendingdata/${email}?filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardAllData(result);
    console.log("the result is ", result);
    console.log("this is state", cardAllData);
  };

  const fetchCardPendingData = async () => {
    const Status = "Pending";

    let data = await fetch(
      `http://localhost:5000/api/card_getpendingdatas/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardPendingData(result);
  };

  const fetchCardApprovedData = async () => {
    const Status = "Disbursed";
    let data = await fetch(
      `http://localhost:5000/api/card_approved-data/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardApprovedData(result);
    console.log(result);
  };

  const fetchCardRejectedData = async () => {
    const Status = "Rejected";
    let data = await fetch(
      `http://localhost:5000/api/card_rejected-data/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardRejectedData(result);
    console.log(result);
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
          <h3 className="fs-3 text-dark ">Loan</h3>
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
            <div className="card-inner">
              <h3 className="fs-5 fs-bold p-3 text-white">LOGIN LEADS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h3 className="text-white fs-3">{allData.length}</h3>
          </div>

          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/pending">
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
            <Link style={{ textDecoration: "none" }} to="/approved">
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
            <Link style={{ textDecoration: "none" }} to="/reject">
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
            <div className="card-inner">
              <h3 className="fs-5 fs-bold p-3 text-white">LOGIN LEADS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h3 className="text-white fs-3">{cardAllData.length}</h3>
          </div>

          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/card_pending">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">PENDING</h3>
                <BsFillGrid3X3GapFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{cardPendingData.length}</h1>
            </Link>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/card_approved">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">DISBURSED</h3>
                <BsPeopleFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
            </Link>
            <h1 className="text-white fs-3">{cardApprovedData.length}</h1>
          </div>
          <div className="dash_card">
            <Link style={{ textDecoration: "none" }} to="/card_reject">
              <div className="card-inner">
                <h3 className="fs-5 fs-bold p-3 text-white">REJECTED</h3>
                <BsFillBellFill
                  className="card_icon"
                  style={{ color: "white" }}
                />
              </div>
              <h1 className="text-white fs-3">{cardRejectData.length}</h1>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
