import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../Header";
import Sidebar from "../TlSidebar";
import "../App.css";
import axios from "axios";
export default function TlPendingData() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [allData, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const Tl_Name = localStorage.getItem("TL_Name");

  const fetchAlldata = async () => {
    const Status = "Pending";
    let data = await fetch(
      `http://localhost:5000/api/getpendingtldatas/${Tl_Name}?Status=${Status}&filter=${selectedFilter}`,
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
        `http://localhost:5000/api/deletePendingData/${_id}`,
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

  const handleTlDelete = async (_id) => {
    try {
      // Send a DELETE request to the backend to delete the pending data
      const response = await fetch(
        `http://localhost:5000/api/deletetlPendingData/${_id}`,
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
      };

      // Make a POST request to your backend API
      axios
        .post("http://localhost:5000/api/submit-approved-data", approvedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
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
      };

      // Make a POST request to your backend API
      axios
        .post("http://localhost:5000/api/submit-rejct-data", approvedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
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
              <th scope="col">Login Amount</th>
              <th scope="col">Login Date</th>
              <th scope="col">
                Upload Date{" "}
                <span style={{ cursor: "pointer" }} onClick={handleSort}>
                  {sortOrder === "asc" ? " ⬆" : " ⬇"}
                </span>
              </th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
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
                <td>{data.Loan_Amount_Applied}</td>
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
                <td>
                  <div
                    className="btn btn-danger m-2"
                    onClick={() => handleTlDelete(data._id)}
                  >
                    Delete
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
                    <label htmlFor="Disbursal_BankName" className="form-label">
                      Disbursal BankName:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Disbursal_BankName"
                      placeholder="Disbursal BankName"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Scheme" className="form-label">
                      Scheme:
                    </label>

                    <select
                      type="text"
                      className="form-control mb-2"
                      name="Scheme"
                      onChange={handleInputChange}
                    >
                      <option selected disabled>
                        Select Scheme
                      </option>
                      <option value="FRESH">FRESH</option>
                      <option value="BT">BT</option>
                      <option value="Top Up">Top Up</option>
                      <option value="BT + Top Up">BT + Top Up</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Loan_Application_No" className="form-label">
                      Application Number:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Loan_Application_No"
                      placeholder="Application Number"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Approved_Amount" className="form-label">
                      Approved Amount:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Approved_Amount"
                      placeholder="Approved Amount"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label
                      htmlFor="Disbursal_Loan_Amount"
                      className="form-label"
                    >
                      Disbursed Loan Amount:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Disbursal_Loan_Amount"
                      placeholder="Disbursed Loan Amount"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Inhand_Disb_Account" className="form-label">
                      Inhand Disb Amount:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Inhand_Disb_Account"
                      placeholder="Inhand Disbursed Amount"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Bt_Disb_Amount" className="form-label">
                      BT Disbursed Amount:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Bt_Disb_Amount"
                      placeholder="BT Disbursed Amount"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Top_Up" className="form-label">
                      Top-Up:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Top_Up"
                      placeholder="Top-Up"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Cibil" className="form-label">
                      CIBIL:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Cibil"
                      placeholder="CIBIL"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Tenure_Disbursal" className="form-label">
                      Tenure Disbursal:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Tenure_Disbursal"
                      placeholder="Tenure Disbursal"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Roi" className="form-label">
                      ROI:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Roi"
                      placeholder="ROI"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="pf" className="form-label">
                      PF:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Pf"
                      placeholder="PF"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Insurance" className="form-label">
                      Insurance:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Insurance"
                      placeholder="Insurance"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Emi" className="form-label">
                      EMI:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Emi"
                      placeholder="EMI"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="First_Emi_Date" className="form-label">
                      First EMI Date:
                    </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="First_Emi_Date"
                      placeholder="First EMI Date"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Disbursal_Date" className="form-label">
                      Disbursal Date:
                    </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="Disbursal_Date"
                      placeholder="Disbursal Date"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="Dsa_Channel_Name" className="form-label">
                      DSA Channel Name:
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="Dsa_Channel_Name"
                      placeholder="DSA Channel Name"
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
                  <label htmlFor="Rejection_Remark" className="form-label">
                    Rejected Category:
                  </label>

                  <select
                    type="text"
                    className="form-control mb-2"
                    name="Rejection_Remark"
                    onChange={handleInputChange}
                  >
                    <option selected disabled>
                      Select Rejected Category
                    </option>
                    <option value="Approved But Not Disbusred-ABND">
                      Approved But Not Disbusred-ABND
                    </option>
                    <option value="ROI ISSUE">ROI ISSUE</option>
                    <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                    <option value="SERVICE ISSUE">SERVICE ISSUE</option>
                    <option value="OVER LEVERAGE">OVER LEVERAGE</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Rejection_Description" className="form-label">
                    Rejection Description:
                  </label>

                  <textarea
                    className="form-control mb-2"
                    name="Rejection_Description"
                    placeholder="Rejection Description"
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
