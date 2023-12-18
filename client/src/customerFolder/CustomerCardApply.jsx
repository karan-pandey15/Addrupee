import React, { useState } from "react";
import CHeader from "./CHeader";
import CSidebar from "./CSidebar";

const CustomerCardApply = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    customerName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    officialMail: "",
    panCardNo: "",
    customerLocation: "",
    companyName: "",
    dob: "",
    gender: "",
    religion: "",
    applyDate: "",
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Fill all the fields before submitting");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/cust_card_apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Form Data Submitted successfully");
        // Reset form or perform other actions
        setFormData({
          bankName: "",
          customerName: "",
          fatherName: "",
          motherName: "",
          mobileNo: "",
          officialMail: "",
          panCardNo: "",
          customerLocation: "",
          companyName: "",
          dob: "",
          gender: "",
          religion: "",
          applyDate: "",
        });
      } else {
        console.error("Failed to send customer card data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="grid-container"
      style={{ backgroundColor: "#E7E5E5", width: "100%" }}
    >
      <CHeader OpenSidebar={OpenSidebar} />
      <CSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <section
        style={{ backgroundColor: "#E7E5E5", width: "100%", margin: "20px" }}
      >
        <div className="container">
          <h2>Basic Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col-12 col-lg-12 col-md-12">
                <label htmlFor="appliedBank" className="form-label">
                  Which Bank You Want To Apply:
                </label>
                <select
                  className="form-select"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                  required
                >
                  <option selected>Select Bank Name</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="AXIS Bank">AXIS Bank</option>
                  <option value="AU Small Finance Bank">
                    AU Small Finance Bank
                  </option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Bajaj">Bajaj</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerName" className="form-label">
                  Customer Name As Per Pan Card:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerFatherName" className="form-label">
                  Father Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerMotherName" className="form-label">
                  Mother Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerMobileNo" className="form-label">
                  Mobile No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerOfficialMail" className="form-label">
                  Official Mail:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="officialMail"
                  value={formData.officialMail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerPanNo" className="form-label">
                  Pan Card No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerLocation" className="form-label">
                  Customer Location:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerLocation"
                  value={formData.customerLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerCompanyName" className="form-label">
                  Company Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerDOB" className="form-label">
                  DOB:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerGender" className="form-label">
                  Gender:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerReligion" className="form-label">
                  Religion:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-4 col-md-6">
                <label htmlFor="customerApplyDate" className="form-label">
                  Date of Apply
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="applyDate"
                  value={formData.applyDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomerCardApply;
