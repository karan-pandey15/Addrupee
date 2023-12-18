import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Header from "../AdminHeader";
import Sidebar from "../AdminSidebar";
import "../App.css";

const AdminTeamLeaderDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [allData, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectData, setRejectedData] = useState([]);

  let Tl_Name = localStorage.getItem("TL_Name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch(
          `http://localhost:5000/api/fetchAlldata/${Tl_Name}?filter=${selectedFilter}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        let result = await data.json();
        setData((prevData) => {
          console.log("this is state", prevData); // Log the previous state for verification
          return result;
        });
        console.log("the result is ", result);
        console.log("this is state data", allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Tl_Name, selectedFilter]);

  const fetchPendingData = async () => {
    const Status = "Pending";
    let data = await fetch(
      `http://localhost:5000/api/getpendingtldatas/${Tl_Name}?Status=${Status}&filter=${selectedFilter}`,
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
      `http://localhost:5000/api/getdisbursedtldatas/${Tl_Name}?Status=${Status}&filter=${selectedFilter}`,
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
      `http://localhost:5000/api/getrejectedtldatas/${Tl_Name}?Status=${Status}&filter=${selectedFilter}`,
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

  useEffect(() => {
    fetchPendingData();
    fetchApprovedData();
    fetchRejectedData();
  }, [selectedFilter]);

  return (
    <div>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <main className="main-container">
          <div className="main-title">
            <h3 className="fs-3 text-dark ">{`${Tl_Name}'s Dashboard`}</h3>
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
              <Link
                style={{ textDecoration: "none" }}
                to="/adminteamleaderlogindata"
              >
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
              <Link
                style={{ textDecoration: "none" }}
                to="/adminteamleaderpendingdata"
              >
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
              <Link
                style={{ textDecoration: "none" }}
                to="/adminteamleaderapproveddata"
              >
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
              <Link
                style={{ textDecoration: "none" }}
                to="/adminteamleaderrejecteddata"
              >
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
        </main>
      </div>
    </div>
  );
};

export default AdminTeamLeaderDashboard;
