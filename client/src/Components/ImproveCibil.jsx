import React, { useState } from "react";
import { Link } from "react-router-dom";
import MaapaFoundation from "../assets/MaapaFoundation.png";
import MaapaQR from "../assets/MaapaQR1.png";

const ImproveCibil = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [silveCheckBox, setSilveCheckBox] = useState(false);
  const [goldCheckBox, setGoldCheckBox] = useState(false);

  const [formData, setFormData] = useState({
    Customer_Name: "",
    Father_Name: "",
    Mother_Name: "",
    Mobile_No: "",
    email: "",
    Pan_No: "",
    Customer_Location: "",
    Company_Name: "",
    dob: "",
    Monthly_Salary: "",
    Cibil_Score: "",
    Resi_Status: "",
    Upload_Cibil: null, // Use null for file input
    Upload_Dontated_Receipt: null, // Use null for file input
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handle file input separately
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0],
      }));
    } else {
      // Handle text input
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks for required fields
    const requiredFields = [
      "Customer_Name",
      "Father_Name",
      "Mother_Name",
      "Mobile_No",
      "email",
      "Pan_No",
      "Customer_Location",
      "Company_Name",
      "dob",
      "Monthly_Salary",
      "Resi_Status",
      "Upload_Cibil",
      "Upload_Dontated_Receipt",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    try {
      const formDataWithFiles = new FormData();

      // Append text fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "Upload_Cibil" && key !== "Upload_Dontated_Receipt") {
          formDataWithFiles.append(key, formData[key]);
        }
      });

      // Append file fields to FormData
      formDataWithFiles.append("Upload_Cibil", formData.Upload_Cibil);
      formDataWithFiles.append(
        "Upload_Dontated_Receipt",
        formData.Upload_Dontated_Receipt
      );

      const response = await fetch("http://localhost:5000/api/cibil_issue", {
        method: "POST",
        body: formDataWithFiles,
      });

      if (response.ok) {
        console.log("Cibil data sent successfully");
        alert("Cibil data sent successfully");
        // Reset form or perform other actions
        setFormData({
          Customer_Name: "",
          Father_Name: "",
          Mother_Name: "",
          Mobile_No: "",
          email: "",
          Pan_No: "",
          Customer_Location: "",
          Company_Name: "",
          dob: "",
          Monthly_Salary: "",
          Cibil_Score: "",
          Resi_Status: "",
          Upload_Cibil: null,
          Upload_Dontated_Receipt: null,
        });
      } else {
        console.error("Failed to send customer data");
        // Handle the case where the request was not successful
        alert("Failed to send customer data. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show an error message to the user
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleSilverCheckboxChange = () => {
    setSilveCheckBox((prevChecked) => !prevChecked);
  };

  const handleGoldCheckboxChange = () => {
    setGoldCheckBox((prevChecked) => !prevChecked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Customer_Name" className="form-label">
              Customer Name As Per Pan Card*
            </label>
            <input
              type="text"
              id="Customer_Name"
              name="Customer_Name"
              className="form-control"
              value={formData.Customer_Name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Father_Name" className="form-label">
              Father Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="Father_Name"
              name="Father_Name"
              value={formData.Father_Name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Mother_Name" className="form-label">
              Mother Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="Mother_Name"
              name="Mother_Name"
              value={formData.Mother_Name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Mobile_No" className="form-label">
              Mobile No*
            </label>
            <input
              type="text"
              id="Mobile_No"
              name="Mobile_No"
              className="form-control"
              value={formData.Mobile_No}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Pan_No" className="form-label">
              Pan Card No*
            </label>
            <input
              type="text"
              className="form-control"
              id="Pan_No"
              name="Pan_No"
              value={formData.Pan_No}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Customer_Location" className="form-label">
              Customer Location*
            </label>
            <input
              type="text"
              id="Customer_Location"
              name="Customer_Location"
              className="form-control"
              value={formData.Customer_Location}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Company_Name" className="form-label">
              Company Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="Company_Name"
              name="Company_Name"
              value={formData.Company_Name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="dob" className="form-label">
              DOB*
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Monthly_Salary" className="form-label">
              Monthly Salary/CTC*
            </label>
            <input
              type="text"
              id="Monthly_Salary"
              name="Monthly_Salary"
              className="form-control"
              value={formData.Monthly_Salary}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Cibil_Score" className="form-label">
              Cibil Score
            </label>
            <input
              type="text"
              className="form-control"
              id="Cibil_Score"
              name="Cibil_Score"
              value={formData.Cibil_Score}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Resi_Status" className="form-label">
              Resi Status Own/Rented*
            </label>
            <select
              className="form-select"
              id="Resi_Status"
              name="Resi_Status"
              aria-label="Default select example"
              value={formData.Resi_Status}
              onChange={handleInputChange}
            >
              <option selected>Select Resi Status</option>
              <option value="Owned">Owned</option>
              <option value="Rented">Rented</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Upload_Cibil" className="form-label">
              Upload Your Cibil(Only PDF & IMAGE)
            </label>
            <input
              type="file"
              id="Upload_Cibil"
              name="Upload_Cibil"
              className="form-control"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Upload_Dontated_Receipt" className="form-label">
              Upload Donated Receipt(Only PDF & IMAGE)
            </label>
            <input
              type="file"
              className="form-control"
              id="Upload_Dontated_Receipt"
              name="Upload_Dontated_Receipt"
              accept=".pdf"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 form-check">
          <input
            style={{ padding: "8px" }}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={handleCheckboxChange}
          />

          <label
            style={{ fontWeight: 500, color: "#264653" }}
            className="form-check-label"
            htmlFor="exampleCheck1"
          >
            If you wish to appoint us as your financial consultant.
          </label>
        </div>

        {isChecked ? (
          <div style={{ paddingTop: "30px" }}>
            <p>
              <span
                style={{ fontSize: "24px", fontWeight: 500, color: "#264653" }}
              >
                Disclaimer :-
              </span>
              <span
                style={{ color: "gray", paddingLeft: "8px", fontSize: "18px" }}
              >
                It's Non-Refundable Fee Which We Are Using For 100% Charity, Our
                NGO Partner
              </span>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "24px",
                  fontWeight: 600,
                  paddingLeft: "12px",
                }}
                to={"https://www.maapafoundation.org"}
              >
                Maapa Foundation
              </Link>
            </p>
            <p style={{ color: "gray" }}>
              AddRupee offers expert guidance on improving your CIBIL score and
              provides solutions for financial issues caused by poor credit
              history. While we cannot directly enhance your CIBIL score, our
              professional services will assist you in understanding how to
              improve it and resolve associated financial challenges
              effectively.
            </p>
            <p style={{ color: "#264653", fontWeight: 500 }}>
              We Have Two Type Of Membership.
            </p>
            <div style={{ display: "flex" }}>
              <div style={{ paddingRight: "50px" }} className="  form-check">
                <input
                  style={{ padding: "8px" }}
                  type="checkbox"
                  className="form-check-input"
                  id="silver"
                  onChange={handleSilverCheckboxChange}
                />
                <label
                  style={{ fontWeight: 500, color: "#264653" }}
                  className="form-check-label"
                  htmlFor="silver"
                >
                  Silver
                </label>
              </div>
              <div className="form-check">
                <input
                  style={{ padding: "8px" }}
                  type="checkbox"
                  className="form-check-input"
                  id="gold"
                  onChange={handleGoldCheckboxChange}
                />
                <label
                  style={{ fontWeight: 500, color: "#264653" }}
                  className="form-check-label"
                  htmlFor="gold"
                >
                  Gold
                </label>
              </div>
            </div>

            {silveCheckBox ? (
              <div>
                <h1 style={{ color: "#c1121f", paddingTop: "10px" }}>1999/-</h1>
                <p style={{ color: "gray" }}>
                  We will asset you to improve your cibil.
                </p>
              </div>
            ) : (
              ""
            )}

            {goldCheckBox ? (
              <div>
                <h1 style={{ color: "#c1121f", paddingTop: "10px" }}>2999/-</h1>
                <p style={{ color: "gray" }}>
                  Our proficient team analyzes your CIBIL, liaises with
                  banks/NBFCs to escalate and resolve issues professionally,
                  enhancing your score.
                </p>
              </div>
            ) : (
              ""
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="row"
            >
              <div className="col-12 col-lg-4 col-md-6">
                <h2
                  style={{
                    color: "#264653",
                    fontWeight: 600,
                    fontSize: "40px",
                  }}
                >
                  Bank Details:-
                </h2>
                <p style={{ color: "#264653", fontWeight: 500 }}>
                  Account Name:
                  <span style={{ color: "gray", paddingLeft: "8px" }}>
                    Maapa Foundation
                  </span>
                </p>
                <p style={{ color: "#264653", fontWeight: 500 }}>
                  Bank Name:{" "}
                  <span style={{ color: "gray", paddingLeft: "8px" }}>
                    Yes Bank
                  </span>
                </p>
                <p style={{ color: "#264653", fontWeight: 500 }}>
                  Branch:{" "}
                  <span style={{ color: "gray", paddingLeft: "8px" }}>
                    Mayur Vihar, Dilhi
                  </span>
                </p>
                <p style={{ color: "#264653", fontWeight: 500 }}>
                  Account No:{" "}
                  <span style={{ color: "gray", paddingLeft: "8px" }}>
                    044988700000151
                  </span>
                </p>
                <p style={{ color: "#264653", fontWeight: 500 }}>
                  IFSC Code:{" "}
                  <span style={{ color: "gray", paddingLeft: "8px" }}>
                    YESB0000449
                  </span>
                </p>
              </div>
              <div className="col-12 col-lg-4 col-md-6">
                <img
                  style={{ width: "350px", height: "350px" }}
                  src={MaapaQR}
                  alt="Maapa Foundation QR"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-6">
                <Link to={"https://www.maapafoundation.org"}>
                  <img
                    style={{ width: "350px", height: "350px" }}
                    src={MaapaFoundation}
                    alt="Maapa Foundation QR"
                  />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "22px 0",
          }}
        >
          <button
            style={{
              backgroundColor: "#036E8C",
              color: "white",
              cursor: "pointer",
            }}
            type="submit"
            className={`btn`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImproveCibil;
