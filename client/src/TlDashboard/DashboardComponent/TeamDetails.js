import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../TlSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const TeamDetails = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [teamDetails, setTeamDetails] = useState([]);
  const [error, setError] = useState(null);

  const Tl_Name = localStorage.getItem("TL_Name");

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getteamdetails/${Tl_Name}`
        );
        setTeamDetails(response.data.employees);
      } catch (error) {
        setError(`Error fetching team details: ${error.message}`);
        console.error("Error fetching team details:", error.message);
      }
    };
    fetchTeamDetails();
  }, [Tl_Name]);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="container">
        <h3>Team Details:</h3>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {teamDetails.map((employee, index) => (
            <Link style={{ textDecoration: "none" }}>
              <div
                key={index}
                style={{
                  margin: 10,
                  width: "200px",
                  height: "150px",
                  borderRadius: "5px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  wordBreak: "break-word",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#22333b",
                    padding: "8px",
                  }}
                >
                  {employee.name}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    color: "#22333b",
                    margin: "0 10px",
                    fontSize: "14px",
                  }}
                >
                  {employee.email}
                </p>
                <button
                  style={{
                    border: "none",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    padding: "4px 0px",
                    backgroundColor: "#17A2B8",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  See Details 👉🏻
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
