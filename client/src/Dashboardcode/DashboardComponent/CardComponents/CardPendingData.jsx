import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import "../../App.css";
import axios from "axios";

export default function CardPendingData() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [allData, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState(""); // To track whether it's "Approved" or "Rejected"

  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const email = localStorage.getItem("employeeEmail");

  const fetchAlldata = async () => {
    const Status = "Pending";
    let data = await fetch(
      `http://localhost:5000/api/card_getpendingdatas/${email}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setData(result);
  };

  const handleDelete = async (_id) => {
    try {
      // Send a DELETE request to the backend to delete the pending data
      const response = await fetch(
        `http://localhost:5000/api/card_deletePendingData/${_id}`,
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

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
    setFormType(""); // Reset formType when opening the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    // Clear the form data when changing form type, and set default values if needed
    setFormData({
      ...formData,
      Status: type === "Rejected" ? "Rejected" : "Disbursed",
    });
  };

  const handleSubmit = () => {
    if (selectedData && formType === "Approved") {
      const approvedData = {
        ...selectedData,
        ...formData,
        email: email,
      };

      // Make a POST request to your backend API
      axios
        .post(
          "http://localhost:5000/api/card_submit-approved-data",
          approvedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Handle success, e.g., show a success message or update UI
            console.log("Data submitted successfully");
            handleDelete(selectedData._id);

            handleCloseModal(); // Close the modal after submission
          } else {
            // Handle any errors or display an error message
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      // Handle validation or show an error message
      console.error("Invalid data for submission");
    }
  };

  const handleRejectSubmit = () => {
    if (selectedData && formType === "Rejected") {
      const approvedData = {
        ...selectedData,
        ...formData,
        email: email,
      };

      // Make a POST request to your backend API
      axios
        .post(
          "http://localhost:5000/api/card_submit-rejct-data",
          approvedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Handle success, e.g., show a success message or update UI

            handleDelete(selectedData._id);
            console.log("Data submitted successfully");

            handleCloseModal(); // Close the modal after submission
          } else {
            // Handle any errors or display an error message
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      // Handle validation or show an error message
      console.error("Invalid data for submission");
    }
  };

  useEffect(() => {
    fetchAlldata();
  }, [email, selectedFilter]);

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
      lowercaseData.uploadDate.includes(searchString)
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

        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">S. No.</th>
              <th scope="col">Customer Name </th>
              <th scope="col">Company Name</th>
              <th scope="col">Pan No.</th>
              <th scope="col">Applied Bank</th>
              <th scope="col">Location</th>
              <th scope="col">AQM Name</th>
              <th scope="col">Login Date</th>
              <th scope="col">
                Upload Date{" "}
                <span style={{ cursor: "pointer" }} onClick={handleSort}>
                  {sortOrder === "asc" ? " ⬆" : " ⬇"}
                </span>
              </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={data.id}>
                <td>{startIndex + index + 1}</td>
                <td>{data.Customer_Name}</td>
                <td>{data.Company_Name}</td>
                <td>{data.Pan_Card}</td>
                <td>{data.Bank_Name}</td>
                <td>{data.Customer_Location}</td>
                <td>{data.Caller_Name}</td>
                <td>{data.Login_Date}</td>
                <td>{new Date(data.Upload_Date).toLocaleDateString()}</td>
                <td>
                  <div
                    className="btn btn-primary m-2"
                    onClick={() => handleOpenModal(data)}
                  >
                    Pending
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Loan Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="firstDiv">
              <p>Name: {selectedData ? selectedData.Customer_Name : ""}</p>
              <p>
                Company Name: {selectedData ? selectedData.Company_Name : ""}
              </p>
              <p>Pan No: {selectedData ? selectedData.Pan_Card : ""}</p>
              <p>Applied Bank: {selectedData ? selectedData.Bank_Name : ""}</p>
              <p>
                Customer Location:{" "}
                {selectedData ? selectedData.Customer_Location : ""}
              </p>
              <p>AQM Name: {selectedData ? selectedData.Caller_Name : ""}</p>
            </div>

            <div className="mb-3">
              <Button
                variant="primary"
                className="m-3"
                onClick={() => handleFormTypeChange("Approved")}
              >
                Disbursed
              </Button>
              <Button
                variant="danger"
                onClick={() => handleFormTypeChange("Rejected")}
              >
                Rejected
              </Button>
            </div>

            {formType === "Approved" && (
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Status" className="form-label">
                      Status:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Status"
                      value={formData.Status}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Card_Issue_Date" className="form-label">
                      Card Issue Date:
                    </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="Card_Issue_Date"
                      placeholder="Card Issue Date"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-12">
                    <label htmlFor="Card_Application_No" className="form-label">
                      Card Application No:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Card_Application_No"
                      placeholder="Card Application No"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            )}

            {formType === "Rejected" && (
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Status" className="form-label">
                      Status:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Status"
                      value={formData.Status}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Rejection_Date" className="form-label">
                      Rejected Date:
                    </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="Rejection_Date"
                      placeholder="Rejected Date"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Rejection_Category" className="form-label">
                    Rejected Category:
                  </label>

                  <select
                    type="text"
                    className="form-control mb-2"
                    name="Rejection_Category"
                    onChange={handleInputChange}
                  >
                    <option selected disabled>
                      Select Rejected Category
                    </option>
                    <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Rejection_Remark" className="form-label">
                    Rejection Remark:
                  </label>

                  <textarea
                    className="form-control mb-2"
                    name="Rejection_Remark"
                    placeholder="Rejection Remark"
                    rows="3"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <Button variant="primary" onClick={handleRejectSubmit}>
                  Submit
                </Button>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
}
