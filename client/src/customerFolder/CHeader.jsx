import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function CHeader({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <button
          className="py-2 px-2 button_vision-class"
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#3e9d7c",
            margin:"0 10px"
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            GoTo Home
          </Link>
        </button>
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default CHeader;
