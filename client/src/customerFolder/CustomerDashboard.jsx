import React, { useEffect, useState } from "react";
import "./App.css";
import CHeader from "./CHeader";
import CSidebar from "./CSidebar";
import CustomerApply from "./CustomerApply";


function CustomerDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <CHeader OpenSidebar={OpenSidebar} />
      <CSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <CustomerApply />
    </div>
  );
}

export default CustomerDashboard;
