// controllers/employeeControllers.js
import {
  DisbursedData,
  Employee,
  FormalData,
  PendingFormData,
  RejectedData,
} from "../models/employeeModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

import moment from "moment";

config();

const secretKey = process.env.SECRET_KEY;

// Generate a secure random verification code
const generateVerificationCode = () => {
  return crypto.randomBytes(32).toString("hex");
};

// create transporter for sending mail
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// verify user middleware

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      Error: "You are not authenticated",
    });
  } else {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.json({
          Error: "Token is not Okay",
        });
      } else {
        try {
          const user = await Employee.findOne({ email: decoded.email });

          if (user) {
            req.name = user.name;
            req.email = user.email;
            console.log("Retrieved email:", req.email);
            next();
          } else {
            return res.json({
              Error: "User not found",
            });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          return res.json({
            Error: "Error fetching user",
          });
        }
      }
    });
  }
};

// get User Login data
export const getUserData = (req, res) => {
  console.log("User Data:", req.name, req.email);
  return res.json({
    Status: "Success",
    name: req.name,
    email: req.email,
  });
};

// Adding this function to validate the email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// register employee for the first time
export const registerEmployee = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.password
    ) {
      return res.json({
        Error: "All fields are required. Please fill in all the fields.",
      });
    }

    // Check if email is in valid format
    if (!isValidEmail(req.body.email)) {
      return res.json({
        Error: "Invalid email format. Please provide a valid email address.",
      });
    }

    if (req.body.password.length < 6) {
      return res.json({
        Error: "Password must be at least 6 characters or digits.",
      });
    }

    // Check if email or phone already exist
    const existingUser = await Employee.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingUser) {
      return res.json({
        Error:
          "User already exists. Please use a different email or phone number.",
      });
    }

    // Create new employee
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      TL_Name: req.body.TL_Name,
      Branch_Name: req.body.Branch_Name,
      userType: req.body.userType,
    });

    // Generate a random verification code
    const verificationCode = generateVerificationCode();

    // Send verification email
    const mailOptions = {
      from: process.env.USER,
      to: req.body.email,
      subject: "Email Verification",
      html: `
      <p>Click the following link to verify your email:</p>
      <a href="http://localhost:3000/email-verification/${verificationCode}">Verify</a>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // Save the verification code in the database along with other user details
    newEmployee.verificationCode = verificationCode;
    await newEmployee.save();

    // Return success response
    return res.json({
      Status: "Success",
      Message: "Mail has been sent successfully. Please verify your email.",
      verificationCode: verificationCode,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

// email verification for employee
export const emailVerification = async (req, res) => {
  const { code } = req.params;

  try {
    // Find the user by verification code
    const user = await Employee.findOne({ verificationCode: code });

    if (user) {
      console.log("Received verification code:", code);
      console.log("Stored verification code:", user.verificationCode);

      // Check if the user is not already verified
      if (!user.is_verified) {
        // Mark the email as verified
        user.is_verified = true;
        // user.verificationCode = ""; // Clear the verification code
        await user.save();

        console.log("User updated successfully:", user);

        return res.json({
          Status: "Success",
          Message: "Email verified successfully.",
          VerificationStatus: "Verified",
        });
      } else {
        console.log("User is already verified.");
        return res.json({
          Status: "Success",
          Message: "Email already verified.",
          VerificationStatus: "AlreadyVerified",
        });
      }
    } else {
      // Handle invalid verification code
      console.log("Invalid verification code:", code);
      return res.status(400).json({ Error: "Invalid verification code." });
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

// login employee api
export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await Employee.findOne({ email });

  if (!user) {
    return res.json({ Error: "No Such Email Existed" });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const { name, userType, email } = user;
    try {
      const token = jwt.sign({ email, userType, name }, secretKey, {
        expiresIn: "8h",
      });
      console.log("Generated Token:", token);
      res.cookie("token", token);
    } catch (error) {
      console.error("JWT Token Generation Error:", error);
      return res.json({
        Error: "JWT Token Generation Error",
      });
    }

    return res.json({ Status: "Success", userType, name, email });
  } else {
    return res.json({ Error: "Password not Matched" });
  }
};

// forgot password api for employee
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Employee.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "No Such Email Existed" });
    }

    const token = jwt.sign(
      { id: user._id, exp: Math.floor(Date.now() / 1000) + 2 * 60 },
      secretKey
    );

    // Send Forgot Password email
    const mailOptions = {
      from: process.env.USER,
      to: req.body.email,
      subject: "For Reset Password",
      html: `
          <p>Click the following link to Reset your Password and This Link will expire in 2 min:</p>
          <a href="http://localhost:3000/reset_password/${user._id}/${token}">Reset</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({
          status: "Success",
          message: "Mail Sent Successfully! Check Your Gmail",
        });
      }
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// reset password api for employee
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Check if the token is valid and not expired
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token expired");
          return res.status(404).json({ error: "Link not found or expired" });
        } else {
          console.log("Invalid token");
          return res.status(400).json({ error: "Invalid token" });
        }
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Employee.findByIdAndUpdate({ _id: id }, { password: hash })
              .then(() => res.json({ status: "Success" }))
              .catch((err) => {
                console.error("Error updating password:", err);
                res.status(500).json({ error: "Internal Server Error" });
              });
          })
          .catch((err) => {
            console.error("Error hashing password:", err);
            res.status(500).json({ error: "Internal Server Error" });
          });
      }
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout employee api
export const logoutEmployee = (req, res) => {
  // Clear the cookie
  res.clearCookie("token");
  res.json({ Status: "Success" });
};

//  AddLeads all data send to database with this API
export const employeeFormAllData = async (req, res) => {
  const data = req.body;

  try {
    // Include the email in the data
    const employeeEmail = req.body.email;
    // Create a new instance of the FormalData model using the request data
    const formalData = new FormalData({
      ...data,
      email: employeeEmail,
    });
    // Save the new data to the database
    await formalData.save();

    // Create a new instance of the FormalData model using the request data
    const pendingFormData = new PendingFormData({
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

// fetch data for employee from FormalData with this API

export const AddleadsAlldata = async (req, res) => {
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
      const data = await FormalData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    // If email is provided, fetch data based on the email
    const userData = await FormalData.find({ email, ...query });

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

// fetch all the data from pendingFormData with this API

export const fetchPendingData = async (req, res) => {
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
      const data = await PendingFormData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await PendingFormData.find({ email, Status, ...query });
    } else {
      userData = await PendingFormData.find({ email, ...query });
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
export const deletePendingData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await PendingFormData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit data for employee from DisbursedData with this API
export const sendApprovedData = async (req, res) => {
  const {
    Status,
    Product_Loan,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mother_Name,
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
    Spouse_Name,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_Address_Line2,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_Address_Line2,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Current_Company_Work_Experience,
    Total_Work_Experience,
    Company_Type,
    Official_Mail,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Salary_Account_BankName,
    Annual_Ctc,
    Net_Salary,
    Obligations,
    Scheme_Offered,
    Loan_Amount_Applied,
    Tenure_Of_Loan,
    Credit_Card_Obligation,
    Reference1_FullName_Relative,
    Reference1_MobileNo,
    Reference1_Address1,
    Reference1_City,
    Reference1_State,
    Reference1_Pin,
    Reference2_FullName_Friend,
    Reference2_MobileNo,
    Reference2_Address1,
    Reference2_City,
    Reference2_State,
    Reference2_Pin,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Scheme,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    Rejection_Date,
    Rejection_Remark,
    Rejection_Description,
    email,
    // Add other fields as needed
  } = req.body;

  // Create a new instance of the DisbursedData model
  const disbursedData = new DisbursedData({
    Status,
    Product_Loan,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mother_Name,
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
    Spouse_Name,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_Address_Line2,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_Address_Line2,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Current_Company_Work_Experience,
    Total_Work_Experience,
    Company_Type,
    Official_Mail,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Salary_Account_BankName,
    Annual_Ctc,
    Net_Salary,
    Obligations,
    Scheme_Offered,
    Loan_Amount_Applied,
    Tenure_Of_Loan,
    Credit_Card_Obligation,
    Reference1_FullName_Relative,
    Reference1_MobileNo,
    Reference1_Address1,
    Reference1_City,
    Reference1_State,
    Reference1_Pin,
    Reference2_FullName_Friend,
    Reference2_MobileNo,
    Reference2_Address1,
    Reference2_City,
    Reference2_State,
    Reference2_Pin,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Scheme,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    Rejection_Date,
    Rejection_Remark,
    Rejection_Description,
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

// Fetch data for employee from DisbursedData with this API

export const fetchApprovedData = async (req, res) => {
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
      const data = await DisbursedData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await DisbursedData.find({ email, Status, ...query });
    } else {
      userData = await DisbursedData.find({ email, ...query });
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

// Submit data for employee from RejectedData with this API

export const sendRejectedData = async (req, res) => {
  const {
    Status,
    Product_Loan,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mother_Name,
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
    Spouse_Name,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_Address_Line2,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_Address_Line2,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Current_Company_Work_Experience,
    Total_Work_Experience,
    Company_Type,
    Official_Mail,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Salary_Account_BankName,
    Annual_Ctc,
    Net_Salary,
    Obligations,
    Scheme_Offered,
    Loan_Amount_Applied,
    Tenure_Of_Loan,
    Credit_Card_Obligation,
    Reference1_FullName_Relative,
    Reference1_MobileNo,
    Reference1_Address1,
    Reference1_City,
    Reference1_State,
    Reference1_Pin,
    Reference2_FullName_Friend,
    Reference2_MobileNo,
    Reference2_Address1,
    Reference2_City,
    Reference2_State,
    Reference2_Pin,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Scheme,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    Rejection_Date,
    Rejection_Remark,
    Rejection_Description,
    email,
  } = req.body;

  // Create a new instance of the DisbursedData model
  const rejectedData = new RejectedData({
    Status,
    Product_Loan,
    Bank_Name,
    Customer_Name,
    Father_Name,
    Mother_Name,
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
    Spouse_Name,
    Qualification,
    Property_Status,
    Aadhar_Card_No,
    Current_Address_Line1,
    Current_Address_Line2,
    Current_City,
    Current_Landmark,
    Current_State,
    Current_Pin,
    Permanent_Address_Line1,
    Permanent_Address_Line2,
    Permanent_City,
    Permanent_Landmark,
    Permanent_State,
    Permanent_Pin,
    Designation,
    Current_Company_Work_Experience,
    Total_Work_Experience,
    Company_Type,
    Official_Mail,
    Company_Address,
    Company_City,
    Company_State,
    Company_Pin,
    Salary_Account_BankName,
    Annual_Ctc,
    Net_Salary,
    Obligations,
    Scheme_Offered,
    Loan_Amount_Applied,
    Tenure_Of_Loan,
    Credit_Card_Obligation,
    Reference1_FullName_Relative,
    Reference1_MobileNo,
    Reference1_Address1,
    Reference1_City,
    Reference1_State,
    Reference1_Pin,
    Reference2_FullName_Friend,
    Reference2_MobileNo,
    Reference2_Address1,
    Reference2_City,
    Reference2_State,
    Reference2_Pin,
    Caller_Name,
    TL_Name,
    Manager_Name,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Scheme,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    Rejection_Date,
    Rejection_Remark,
    Rejection_Description,
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

// Fetch Rejected data from RejectedData table with this API

export const fetchRejectedData = async (req, res) => {
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
      const data = await RejectedData.find({ ...query });
      console.log("All Data retrieved");
      return res.status(200).json(data);
    }

    let userData;

    if (Status) {
      userData = await RejectedData.find({ email, Status, ...query });
    } else {
      userData = await RejectedData.find({ email, ...query });
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
