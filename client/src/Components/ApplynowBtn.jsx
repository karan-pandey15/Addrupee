import React from "react";
import { Link } from "react-router-dom";

function ApplynowBtn() {
  const roundButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#3E9D7C",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    borderRadius: "45%",
    padding: "15px",
    cursor: "pointer",
  };
  return (
    <div>
      <div>
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/customer_signup"
        >
          <button style={roundButtonStyle}>Apply Now</button>
        </Link>
      </div>
    </div>
  );
}

export default ApplynowBtn;
