import React, { useState } from "react";

const CareerFrom = () => {
  const [formData, setFormData] = useState({
    Customer_Name: "",
    Father_Name: "",
    Mobile_No: "",
    email: "",
    Customer_Location: "",
    Upload_Cibil: null, // Use null for file input
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
      "Mobile_No",
      "email",
      "Customer_Location",
      "Upload_Cibil",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields `);
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

      const response = await fetch("http://localhost:5000/api/career_form", {
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
          Mobile_No: "",
          email: "",
          Customer_Location: "",
          Upload_Cibil: null,
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

  return (
    <div style={{ marginTop: "50px" }} className="container">
      <h3
        style={{
          color: "#036E8C",
          fontWeight: "bolder",
          margin: "50px 0",
        }}
        className="text-center"
      >
        Apply Now
        <hr />
      </h3>
      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-4 mb-3">
            <label htmlFor="Customer_Name" className="form-label">
              Your Full Name*
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
          <div className="col-12 col-xl-4 col-md-4 mb-3">
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
          <div className="col-12 col-xl-4 col-md-4 mb-3">
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
        </div>
        <div className="row">
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
            <label htmlFor="Customer_Location" className="form-label">
              Current Address*
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
        </div>
        <div className="row">
          <div className="col-12 col-xl-4 col-md-6 mb-3">
            <label htmlFor="Upload_Cibil" className="form-label">
              Upload Your Cv(Only PDF)
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
        </div>

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

export default CareerFrom;
