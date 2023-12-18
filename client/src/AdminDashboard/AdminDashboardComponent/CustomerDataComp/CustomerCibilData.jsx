import React, { useState, useEffect } from "react";
import Header from "../../AdminHeader";
import Sidebar from "../../AdminSidebar";
import "../../App.css";

const CustomerCibilData = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

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

  const fetchAlldata = async () => {
    let data = await fetch(`http://localhost:5000/api/get_cibilIssue_data`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    let result = await data.json();
    console.log(result);
    if (!Array.isArray(result)) {
      console.log("API response is not an array:", result);
      return;
    }
    setData(result);
    console.log(result);
  };

  const handleCustomerLoanDataDelete = async (_id) => {
    try {
      // Send a DELETE request to the backend to delete the pending data
      const response = await fetch(
        `http://localhost:5000/api/delete_cibilIssue_data/${_id}`,
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
        fetchAlldata();
      } else {
        // Handle any errors or display an error message
        console.error("Error deleting data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchAlldata();
  }, []);

  useEffect(() => {
    // Apply sorting to the data based on applyDate
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.applyDate);
      const dateB = new Date(b.applyDate);

      const compareResult = dateB - dateA;
      return sortOrder === "asc" ? compareResult : -compareResult;
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
      Customer_Name: data.Customer_Name ? data.Customer_Name.toLowerCase() : "",
      Father_Name: data.Father_Name ? data.Father_Name.toLowerCase() : "",
      Mother_Name: data.Mother_Name ? data.Mother_Name.toLowerCase() : "",
      Mobile_No: data.Mobile_No ? data.Mobile_No.toLowerCase() : "",
      email: data.email ? data.email.toLowerCase() : "",
      Pan_No: data.Pan_No ? data.Pan_No.toLowerCase() : "",
      Customer_Location: data.Customer_Location
        ? data.Customer_Location.toLowerCase()
        : "",
      Company_Name: data.Company_Name ? data.Company_Name.toLowerCase() : "",
      dob: data.dob ? data.dob.toLowerCase() : "",
      Monthly_Salary: data.Monthly_Salary
        ? data.Monthly_Salary.toLowerCase()
        : "",
      Resi_Status: data.Resi_Status ? data.Resi_Status.toLowerCase() : "",
    };

    return (
      lowercaseData.Customer_Name.includes(searchString) ||
      lowercaseData.Father_Name.includes(searchString) ||
      lowercaseData.Mother_Name.includes(searchString) ||
      lowercaseData.Mobile_No.includes(searchString) ||
      lowercaseData.email.includes(searchString) ||
      lowercaseData.Pan_No.includes(searchString) ||
      lowercaseData.Customer_Location.includes(searchString) ||
      lowercaseData.Company_Name.includes(searchString) ||
      lowercaseData.dob.includes(searchString) ||
      lowercaseData.Monthly_Salary.includes(searchString) ||
      lowercaseData.Resi_Status.includes(searchString)
    );
  });

  // Paginate the filtered data
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
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
        <table class="table table-responsive">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Customer Name </th>
              <th scope="col">Father Name </th>
              <th scope="col">Mother Name.</th>
              <th scope="col">Mobile No</th>
              <th scope="col">email</th>
              <th scope="col">Pan No.</th>
              <th scope="col">Customer_Location</th>

              <th scope="col">Company_Name </th>
              <th scope="col">dob</th>
              <th scope="col">Monthly_Salary.</th>
              <th scope="col">Resi Status</th>
              <th scope="col">
                Applied Date
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
                <td>{data.Father_Name}</td>
                <td>{data.Mother_Name}</td>
                <td>{data.Mobile_No}</td>
                <td>{data.email}</td>
                <td>{data.Pan_No}</td>
                <td>{data.Customer_Location}</td>
                <td>{data.Company_Name}</td>
                <td>{data.dob}</td>
                <td>{data.Monthly_Salary}</td>
                <td>{data.Resi_Status}</td>
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
                    onClick={() => handleCustomerLoanDataDelete(data._id)}
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
                  Loan Data
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
                    <p>Father Name: {selectedRowData.Father_Name}</p>
                    <p>Mother Name: {selectedRowData.Mother_Name}</p>
                    <p>Mobile: {selectedRowData.Mobile_No}</p>
                    <p>Email : {selectedRowData.email}</p>
                    <p>Pan No : {selectedRowData.Pan_No}</p>
                    <p>Location.: {selectedRowData.Customer_Location}</p>
                    <p>Company Name: {selectedRowData.Company_Name}</p>

                    <p>dob : {selectedRowData.dob}</p>
                    <p>Monthly Salary.: {selectedRowData.Monthly_Salary}</p>
                    <p>Resi_Status: {selectedRowData.Resi_Status}</p>
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
  );
};

export default CustomerCibilData;
