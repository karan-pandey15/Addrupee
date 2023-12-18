import React, { useState, useEffect } from "react";
import Header from "../../AdminHeader";
import Sidebar from "../../AdminSidebar";
import "../../App.css";

const CustomerCardData = () => {
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
    let data = await fetch(`http://localhost:5000/api/get_cust_card_data`, {
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
        `http://localhost:5000/api/delete_card_data/${_id}`,
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
      customerName: data.customerName ? data.customerName.toLowerCase() : "",
      companyName: data.companyName ? data.companyName.toLowerCase() : "",
      panCard: data.panCardNo ? data.panCardNo.toLowerCase() : "",
      location: data.customerLocation
        ? data.customerLocation.toLowerCase()
        : "",
      appliedBank: data.bankName ? data.bankName.toLowerCase() : "",
      mobileNo: data.mobileNo ? data.mobileNo.toLowerCase() : "",
      officialMail: data.officialMail ? data.officialMail.toLowerCase() : "",
      appliedDate: data.applyDate ? data.applyDate.toLowerCase() : "",
    };

    return (
      lowercaseData.customerName.includes(searchString) ||
      lowercaseData.companyName.includes(searchString) ||
      lowercaseData.panCard.includes(searchString) ||
      lowercaseData.location.includes(searchString) ||
      lowercaseData.appliedBank.includes(searchString) ||
      lowercaseData.mobileNo.includes(searchString) ||
      lowercaseData.officialMail.includes(searchString) ||
      lowercaseData.appliedDate.includes(searchString)
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
              <th scope="col">Company Name</th>
              <th scope="col">Pan No.</th>
              <th scope="col">Applied Bank</th>
              <th scope="col">Location</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Official Mail</th>
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
                <td>{data.customerName}</td>
                <td>{data.companyName}</td>
                <td>{data.panCardNo}</td>
                <td>{data.bankName}</td>
                <td>{data.customerLocation}</td>
                <td>{data.mobileNo}</td>
                <td>{data.officialMail}</td>
                <td>{data.applyDate}</td>
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
                    <p>Customer Name: {selectedRowData.customerName}</p>
                    <p>Company Name: {selectedRowData.companyName}</p>
                    <p>Pan No: {selectedRowData.panCardNo}</p>
                    <p>Location: {selectedRowData.customerLocation}</p>
                    <p>Applied Bank: {selectedRowData.bankName}</p>
                    <p>Official Mail: {selectedRowData.officialMail}</p>
                    <p>Mobile No.: {selectedRowData.mobileNo}</p>
                    <p>Applied Date: {selectedRowData.applyDate}</p>
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

export default CustomerCardData;
