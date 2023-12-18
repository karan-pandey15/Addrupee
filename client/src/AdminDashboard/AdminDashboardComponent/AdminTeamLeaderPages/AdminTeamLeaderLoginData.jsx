import React, { useState, useEffect } from "react";
import Header from "../../AdminHeader";
import Sidebar from "../../AdminSidebar";

const AdminTeamLeaderLoginData = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [allData, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  let Tl_Name = localStorage.getItem("TL_Name");
  console.log("TL_Name from localStorage:", Tl_Name);

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

  const handleLoginLeadsAdminDelete = async (_id) => {
    try {
      // Send a DELETE request to the backend to delete the pending data
      const response = await fetch(
        `http://localhost:5000/api/deleteadminLoginLeadData/${_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      // Check if the deletion was successful
      if (response.status === 200) {
        console.log(result.message);
        // Refresh the data in the table after deletion
        fetchData();
      } else {
        // Handle any errors or display an error message
        console.error("Error deleting data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Tl_Name, selectedFilter]);

  useEffect(() => {
    // Apply sorting to the data based on Upload_Date initially
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.Upload_Date);
      const dateB = new Date(b.Upload_Date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedData(sorted);
  }, [allData, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const filteredData = sortedData.filter((data) => {
    const searchString = searchItem.toLowerCase();

    // Convert data fields to lowercase for case-insensitive comparison
    const lowercaseData = {
      customerName: data.Customer_Name.toLowerCase(),
      companyName: data.Company_Name.toLowerCase(),
      panCard: data.Pan_Card.toLowerCase(),
      location: data.Customer_Location.toLowerCase(),
      callerName: data.Caller_Name.toLowerCase(),
      appliedBank: data.Bank_Name.toLowerCase(),
      loginDate: data.Login_Date.toLowerCase(),
      loginAmount: data.Loan_Amount_Applied.toLowerCase(),
      uploadDate: data.Upload_Date.toLowerCase(),
    };

    return (
      lowercaseData.customerName.includes(searchString) ||
      lowercaseData.companyName.includes(searchString) ||
      lowercaseData.panCard.includes(searchString) ||
      lowercaseData.location.includes(searchString) ||
      lowercaseData.callerName.includes(searchString) ||
      lowercaseData.appliedBank.includes(searchString) ||
      lowercaseData.loginDate.includes(searchString) ||
      lowercaseData.loginAmount.includes(searchString) ||
      lowercaseData.uploadDate.includes(searchString)
    );
  });

  // Paginate the filtered data
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <div className="container">
          <div style={{ width: "400px" }}>
            <input
              className="form-control mb-2"
              type="search"
              placeholder="Search..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
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
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Customer Name </th>
                <th scope="col">Company Name</th>
                <th scope="col">Pan No.</th>
                <th scope="col">Applied Bank</th>
                <th scope="col">Location</th>
                <th scope="col">AQM Name</th>
                <th scope="col">Login Amount</th>
                <th scope="col">Login Date</th>
                <th scope="col">
                  Upload Date
                  <span style={{ cursor: "pointer" }} onClick={handleSort}>
                    {sortOrder === "asc" ? " ⬆" : " ⬇"}
                  </span>
                </th>
                <th scope="col">View</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, index) => (
                <tr key={index} onClick={() => handleRowClick(data)}>
                  <td>{startIndex + index + 1}</td>
                  <td>{data.Customer_Name}</td>
                  <td>{data.Company_Name}</td>
                  <td>{data.Pan_Card}</td>
                  <td>{data.Bank_Name}</td>
                  <td>{data.Customer_Location}</td>
                  <td>{data.Caller_Name}</td>
                  <td>{data.Loan_Amount_Applied}</td>
                  <td>{data.Login_Date}</td>
                  <td>{new Date(data.Upload_Date).toLocaleDateString()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <div
                      className="btn btn-danger m-2"
                      onClick={() => handleLoginLeadsAdminDelete(data._id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <!-- Modal --> */}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Login Data
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {selectedRowData && (
                    <div>
                      <p>Customer Name: {selectedRowData.Customer_Name}</p>
                      <p>Product Loan: {selectedRowData.Product_Loan}</p>
                      <p>Bank Name: {selectedRowData.Bank_Name}</p>
                      <p>Father Name: {selectedRowData.Father_Name}</p>
                      <p>Mother Name: {selectedRowData.Mother_Name}</p>
                      <p>Mobile: {selectedRowData.Mobile}</p>
                      <p>Personal Email: {selectedRowData.Personal_Email}</p>
                      <p>Pan Card: {selectedRowData.Pan_Card}</p>
                      <p>
                        Customer Location: {selectedRowData.Customer_Location}
                      </p>
                      <p>Company Name: {selectedRowData.Company_Name}</p>
                      <p>DOB: {selectedRowData.Dob}</p>
                      <p>Login Date: {selectedRowData.Login_Date}</p>
                      <p>Gender: {selectedRowData.Gender}</p>
                      <p>Religion: {selectedRowData.Religion}</p>
                      <p>Income Source: {selectedRowData.Income_Source}</p>
                      <p>Marital Status: {selectedRowData.Marital_Status}</p>
                      <p>Spouse Name: {selectedRowData.Spouse_Name}</p>
                      <p>Qualification: {selectedRowData.Qualification}</p>
                      <p>Property Status: {selectedRowData.Property_Status}</p>
                      <p>Aadhar Card No: {selectedRowData.Aadhar_Card_No}</p>
                      <p>
                        Current Address Line 1:{" "}
                        {selectedRowData.Current_Address_Line1}
                      </p>
                      <p>
                        Current Address Line 2:{" "}
                        {selectedRowData.Current_Address_Line2}
                      </p>
                      <p>Current City: {selectedRowData.Current_City}</p>
                      <p>
                        Current Landmark: {selectedRowData.Current_Landmark}
                      </p>
                      <p>Current State: {selectedRowData.Current_State}</p>
                      <p>Current Pin: {selectedRowData.Current_Pin}</p>
                      <p>
                        Permanent Address Line 1:{" "}
                        {selectedRowData.Permanent_Address_Line1}
                      </p>
                      <p>
                        Permanent Address Line 2:{" "}
                        {selectedRowData.Permanent_Address_Line2}
                      </p>
                      <p>Permanent City: {selectedRowData.Permanent_City}</p>
                      <p>
                        Permanent Landmark: {selectedRowData.Permanent_Landmark}
                      </p>
                      <p>Permanent State: {selectedRowData.Permanent_State}</p>
                      <p>Permanent Pin: {selectedRowData.Permanent_Pin}</p>
                      <p>Designation: {selectedRowData.Designation}</p>
                      <p>
                        Current Company Work Experience:{" "}
                        {selectedRowData.Current_Company_Work_Experience}
                      </p>
                      <p>
                        Total Work Experience:{" "}
                        {selectedRowData.Total_Work_Experience}
                      </p>
                      <p>Company Type: {selectedRowData.Company_Type}</p>
                      <p>Official Mail: {selectedRowData.Official_Mail}</p>
                      <p>Company Address: {selectedRowData.Company_Address}</p>
                      <p>Company City: {selectedRowData.Company_City}</p>
                      <p>Company State: {selectedRowData.Company_State}</p>
                      <p>Company Pin: {selectedRowData.Company_Pin}</p>
                      <p>
                        Salary Account Bank Name:{" "}
                        {selectedRowData.Salary_Account_BankName}
                      </p>
                      <p>Annual CTC: {selectedRowData.Annual_Ctc}</p>
                      <p>Net Salary: {selectedRowData.Net_Salary}</p>
                      <p>Obligations: {selectedRowData.Obligations}</p>
                      <p>Scheme Offered: {selectedRowData.Scheme_Offered}</p>
                      <p>
                        Loan Amount Applied:{" "}
                        {selectedRowData.Loan_Amount_Applied}
                      </p>
                      <p>Tenure Of Loan: {selectedRowData.Tenure_Of_Loan}</p>
                      <p>
                        Credit Card Obligation:{" "}
                        {selectedRowData.Credit_Card_Obligation}
                      </p>
                      <p>
                        Reference1 Full Name Relative:{" "}
                        {selectedRowData.Reference1_FullName_Relative}
                      </p>
                      <p>
                        Reference1 Mobile No:{" "}
                        {selectedRowData.Reference1_MobileNo}
                      </p>
                      <p>
                        Reference1 Address1:{" "}
                        {selectedRowData.Reference1_Address1}
                      </p>
                      <p>Reference1 City: {selectedRowData.Reference1_City}</p>
                      <p>
                        Reference1 State: {selectedRowData.Reference1_State}
                      </p>
                      <p>Reference1 Pin: {selectedRowData.Reference1_Pin}</p>
                      <p>
                        Reference2 Full Name Friend:{" "}
                        {selectedRowData.Reference2_FullName_Friend}
                      </p>
                      <p>
                        Reference2 Mobile No:{" "}
                        {selectedRowData.Reference2_MobileNo}
                      </p>
                      <p>
                        Reference2 Address1:{" "}
                        {selectedRowData.Reference2_Address1}
                      </p>
                      <p>Reference2 City: {selectedRowData.Reference2_City}</p>
                      <p>
                        Reference2 State: {selectedRowData.Reference2_State}
                      </p>
                      <p>Reference2 Pin: {selectedRowData.Reference2_Pin}</p>
                      <p>Caller Name: {selectedRowData.Caller_Name}</p>
                      <p>TL Name: {selectedRowData.TL_Name}</p>
                      <p>Manager Name: {selectedRowData.Manager_Name}</p>
                      <p>
                        Disbursal Bank Name:{" "}
                        {selectedRowData.Disbursal_BankName}
                      </p>
                      <p>
                        Loan Application No:{" "}
                        {selectedRowData.Loan_Application_No}
                      </p>
                      <p>Approved Amount: {selectedRowData.Approved_Amount}</p>
                      <p>
                        Disbursal Loan Amount:{" "}
                        {selectedRowData.Disbursal_Loan_Amount}
                      </p>
                      <p>
                        Inhand Disb Account:{" "}
                        {selectedRowData.Inhand_Disb_Account}
                      </p>
                      <p>Bt Disb Amount: {selectedRowData.Bt_Disb_Amount}</p>
                      <p>Top Up: {selectedRowData.Top_Up}</p>
                      <p>Cibil: {selectedRowData.Cibil}</p>
                      <p>
                        Tenure Disbursal: {selectedRowData.Tenure_Disbursal}
                      </p>
                      <p>Roi: {selectedRowData.Roi}</p>
                      <p>Pf: {selectedRowData.Pf}</p>
                      <p>Insurance: {selectedRowData.Insurance}</p>
                      <p>Emi: {selectedRowData.Emi}</p>
                      <p>First Emi Date: {selectedRowData.First_Emi_Date}</p>
                      <p>Scheme: {selectedRowData.Scheme}</p>
                      <p>Login Bank: {selectedRowData.Login_Bank}</p>
                      <p>Disbursal Date: {selectedRowData.Disbursal_Date}</p>
                      <p>
                        Dsa Channel Name: {selectedRowData.Dsa_Channel_Name}
                      </p>
                      <p>Rejection Date: {selectedRowData.Rejection_Date}</p>
                      <p>
                        Rejection Remark: {selectedRowData.Rejection_Remark}
                      </p>
                      <p>
                        Rejection Description:{" "}
                        {selectedRowData.Rejection_Description}
                      </p>
                      <p>Email: {selectedRowData.email}</p>
                      <p>Upload Date: {selectedRowData.Upload_Date}</p>
                    </div>
                  )}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                cursor: pageIndex === 0 ? "not-allowed" : "pointer",
                border: "none",
                color: pageIndex === 0 ? "black" : "white",
                backgroundColor: pageIndex === 0 ? "lightgray" : "black",
                borderRadius: "6px",
                marginRight: "4px",
              }}
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              Prev
            </button>
            <span>
              <strong>{pageIndex + 1}</strong> of{" "}
              {Math.ceil(filteredData.length / pageSize)}
            </span>
            <button
              style={{
                cursor:
                  endIndex >= filteredData.length ? "not-allowed" : "pointer",
                border: "none",
                color: endIndex >= filteredData.length ? "black" : "white",
                backgroundColor:
                  endIndex >= filteredData.length ? "lightgray" : "black",
                borderRadius: "6px",
                marginLeft: "4px",
              }}
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={endIndex >= filteredData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTeamLeaderLoginData;
