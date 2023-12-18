import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/addrupeeText.png";

function CSidebar({ openSidebarToggle, OpenSidebar }) {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get_customer_data")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/cust_logout")
      .then((res) => {
        // location.reload(true);
        if (res.data.Status === "Success") {
          navigate("/customer_signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img style={{ height: "40px", width: "130px" }} src={Logo} />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <div style={{ marginLeft: "50px" }}>
        {auth ? (
          <div>
            <h4 style={{ color: "#dad7cd" }}>Welcome</h4>
            <p style={{ color: "white" }}>{name}</p>
          </div>
        ) : (
          <div>
            <p>{message}</p>
          </div>
        )}
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/customer_dashboard">
            <BsGrid1X2Fill className="icon" />
            Apply Now
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/cust_loan_apply">
            <BsFillGrid3X3GapFill className="icon" />
            Apply For Loan
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/cust_card_apply">
            <BsListCheck className="icon" /> Apply for Card
          </Link>
        </li>
        {/* <li className="sidebar-list-item">
          <Link to="/cust_cibil_issue">
            <BsListCheck className="icon" /> Issue related Cibil
          </Link>
        </li> */}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        {auth ? (
          <div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>{message}</p>
            <p>Login First</p>
            <Link to={"/customer_signin"} className="btn btn-primary">
              Login
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

export default CSidebar;
