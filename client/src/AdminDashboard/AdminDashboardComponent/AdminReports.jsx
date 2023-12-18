import React, { useState, useEffect } from "react";
import Header from "../AdminHeader";
import Sidebar from "../AdminSidebar";
import { Link, useNavigate } from "react-router-dom";

export default function AdminReports() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [teamLeaders, setTeamLeaders] = useState([]);

  const Navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchTeamLeaders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/getteamleaderdetails"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTeamLeaders(result.employees); // Assuming the result has a property "employees"
    } catch (error) {
      console.error("Error fetching team leader details:", error.message);
    }
  };

  const handleTeamLeaderClick = (tlName) => {
    localStorage.setItem("TL_Name", tlName);
    Navigate(`/details/${tlName}`);
  };

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

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
          {teamLeaders.map((tl, index) => (
            <Link to={`/details/${tl.name}`} style={{ textDecoration: "none" }}>
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
                onClick={() => handleTeamLeaderClick(tl.name)}
              >
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "#22333b",
                    padding: "8px",
                  }}
                >
                  {tl.name}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    color: "#22333b",
                    margin: "0 10px",
                    fontSize: "14px",
                  }}
                >
                  {tl.email}
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
}
