// controllers/employeeControllers.js
import {
  CardFormAlData,
  CardPendingFormData,
  CardDisbursedData,
  CardRejectedData,
} from "../models/employeeCardModels.js";

import { config } from "dotenv";

import moment from "moment";

config();

// Card AddLeads all data send to database with this API
export const employeeCardFormApply = async (req, res) => {
  const data = req.body;

  try {
    // Include the email in the data
    const employeeEmail = req.body.email;
    // Create a new instance of the FormalData model using the request data
    const formalData = new CardFormAlData({
      ...data,
      email: employeeEmail,
    });
    // Save the new data to the database
    await formalData.save();

    // Create a new instance of the FormalData model using the request data
    const pendingFormData = new CardPendingFormData({
      ...data,
      email: employeeEmail,
    });
    // Save the new data to the database
    await pendingFormData.save();

    console.log("Form data submitted successfully");
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res
      .status(500)
      .json({ error: "Failed to submit the form", details: err.message });
  }
};

// Fetch Card form all data using this API for employee
export const fetchCardFormAlData = async (req, res) => {
  try {
    let query = {};
    const { email } = req.params;
    const { filter } = req.query;

    if (filter) {
      switch (filter) {
        case "all":
          query = {
            Upload_Date: {
              $gte: moment().subtract(5000, "years").startOf("day"),
            },
          };
          break;
        case "last7days":
          query = {
            Upload_Date: { $gte: moment().subtract(7, "days").startOf("day") },
          };
          break;
        case "last30days":
          query = {
            Upload_Date: { $gte: moment().subtract(30, "days").startOf("day") },
          };
          break;
        case "lastday":
          query = {
            Upload_Date: { $gte: moment().subtract(1, "days").startOf("day") },
          };
          break;
        case "from1to31":
          query = {
            Upload_Date: {
              $gte: moment().date(1).startOf("day"),
              $lte: moment().date(31).endOf("day"),
            },
          };
          break;
      }
    }

    // If email is not provided or is empty, fetch all data
    if (!email) {
      const data = await CardFormAlData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    // If email is provided, fetch data based on the email
    const userData = await CardFormAlData.find({ email, ...query });

    if (!userData) {
      console.log("No data found for the provided email");
      return res
        .status(404)
        .json({ message: "No data found for the provided email" });
    }

    console.log("Data retrieved for the provided email and Status");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch card all the data from pendingFormData with this API
export const fetchCardPendingData = async (req, res) => {
  try {
    let query = {};
    const { email } = req.params;
    const { Status, filter } = req.query;
    console.log("Pending Status ", Status);

    if (filter) {
      switch (filter) {
        case "all":
          query = {
            Upload_Date: {
              $gte: moment().subtract(5000, "years").startOf("day"),
            },
          };
          break;
        case "last7days":
          query = {
            Upload_Date: { $gte: moment().subtract(7, "days").startOf("day") },
          };
          break;
        case "last30days":
          query = {
            Upload_Date: { $gte: moment().subtract(30, "days").startOf("day") },
          };
          break;
        case "lastday":
          query = {
            Upload_Date: { $gte: moment().subtract(1, "days").startOf("day") },
          };
          break;
        case "from1to31":
          query = {
            Upload_Date: {
              $gte: moment().date(1).startOf("day"),
              $lte: moment().date(31).endOf("day"),
            },
          };
          break;
      }
    }

    // If email is not provided or is empty, fetch all data
    if (!email) {
      const data = await CardPendingFormData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await CardPendingFormData.find({ email, Status, ...query });
    } else {
      userData = await CardPendingFormData.find({ email, ...query });
    }

    if (!userData) {
      console.log("No data found for the provided email");
      return res
        .status(404)
        .json({ message: "No data found for the provided email" });
    }

    console.log("Data retrieved for the provided email");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Pending Data after submit API
export const deleteCardPendingData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CardPendingFormData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// submit card disbursed data using this API to CardDisbursedData

export const sendCardApprovedData = async (req, res) => {
  const {
    Status,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Gender,
    Religion,
    Income_Source,
    Marital_Status,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Annual_Ctc,
    Net_Salary,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Card_Application_No,
    Card_Issue_Date,
    Rejection_Category,
    Rejection_Remark,
    Rejection_Date,
    email,
    // Add other fields as needed
  } = req.body;

  // Create a new instance of the DisbursedData model
  const disbursedData = new CardDisbursedData({
    Status,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Gender,
    Religion,
    Income_Source,
    Marital_Status,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Annual_Ctc,
    Net_Salary,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Card_Application_No,
    Card_Issue_Date,
    Rejection_Category,
    Rejection_Remark,
    Rejection_Date,
    email,
    // Add other fields here
  });

  // Save the new data to the database
  try {
    await disbursedData.save();
    console.log("Data inserted successfully");
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetch Card Disbursed Data form CardDisbursedData using this API
export const fetchCardApprovedData = async (req, res) => {
  try {
    let query = {};
    const { email } = req.params;
    const { Status, filter } = req.query;
    console.log("Disbursed Status ", Status);

    if (filter) {
      switch (filter) {
        case "all":
          query = {
            Upload_Date: {
              $gte: moment().subtract(5000, "years").startOf("day"),
            },
          };
          break;
        case "last7days":
          query = {
            Upload_Date: { $gte: moment().subtract(7, "days").startOf("day") },
          };
          break;
        case "last30days":
          query = {
            Upload_Date: { $gte: moment().subtract(30, "days").startOf("day") },
          };
          break;
        case "lastday":
          query = {
            Upload_Date: { $gte: moment().subtract(1, "days").startOf("day") },
          };
          break;
        case "from1to31":
          query = {
            Upload_Date: {
              $gte: moment().date(1).startOf("day"),
              $lte: moment().date(31).endOf("day"),
            },
          };
          break;
      }
    }

    // If email is not provided or is empty, fetch all data
    if (!email) {
      const data = await CardDisbursedData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await CardDisbursedData.find({ email, Status, ...query });
    } else {
      userData = await CardDisbursedData.find({ email, ...query });
    }

    if (!userData) {
      console.log("No data found for the provided email");
      return res
        .status(404)
        .json({ message: "No data found for the provided email" });
    }

    console.log("Data retrieved for the provided email");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Submit Card rejected Data using this API to CardRejectedData
export const sendCardRejectedData = async (req, res) => {
  const {
    Status,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Gender,
    Religion,
    Income_Source,
    Marital_Status,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Annual_Ctc,
    Net_Salary,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Card_Application_No,
    Card_Issue_Date,
    Rejection_Category,
    Rejection_Remark,
    Rejection_Date,
    email,
  } = req.body;

  // Create a new instance of the DisbursedData model
  const rejectedData = new CardRejectedData({
    Status,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Gender,
    Religion,
    Income_Source,
    Marital_Status,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Annual_Ctc,
    Net_Salary,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Card_Application_No,
    Card_Issue_Date,
    Rejection_Category,
    Rejection_Remark,
    Rejection_Date,
    email,
  });

  // Save the new data to the database
  try {
    await rejectedData.save();
    console.log("Data inserted successfully");
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch Rejected data from rejected_data table with this API

export const fetchCardRejectedData = async (req, res) => {
  try {
    let query = {};
    const { email } = req.params;
    const { Status, filter } = req.query;
    console.log("Rejected Status", Status);

    if (filter) {
      switch (filter) {
        case "all":
          query = {
            Upload_Date: {
              $gte: moment().subtract(5000, "years").startOf("day"),
            },
          };
          break;
        case "last7days":
          query = {
            Upload_Date: { $gte: moment().subtract(7, "days").startOf("day") },
          };
          break;
        case "last30days":
          query = {
            Upload_Date: { $gte: moment().subtract(30, "days").startOf("day") },
          };
          break;
        case "lastday":
          query = {
            Upload_Date: { $gte: moment().subtract(1, "days").startOf("day") },
          };
          break;
        case "from1to31":
          query = {
            Upload_Date: {
              $gte: moment().date(1).startOf("day"),
              $lte: moment().date(31).endOf("day"),
            },
          };
          break;
      }
    }

    // If email is not provided or is empty, fetch all data
    if (!email) {
      const data = await CardRejectedData.find({});
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await CardRejectedData.find({ email, Status, ...query });
    } else {
      userData = await CardRejectedData.find({ email, ...query });
    }

    if (!userData) {
      console.log("No data found for the provided email");
      return res
        .status(404)
        .json({ message: "No data found for the provided email" });
    }

    console.log("Data retrieved for the provided email");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
