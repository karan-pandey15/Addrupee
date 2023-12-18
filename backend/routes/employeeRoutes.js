import express from "express";
import {
  registerEmployee,
  loginEmployee,
  verifyUser,
  getUserData,
  logoutEmployee,
  employeeFormAllData,
  AddleadsAlldata,
  sendApprovedData,
  fetchApprovedData,
  sendRejectedData,
  fetchRejectedData,
  fetchPendingData,
  deletePendingData,
  emailVerification,
  forgotPassword,
  resetPassword,
} from "../controllers/employeeControllers.js";

const router = express.Router();

router.post("/emp_register", registerEmployee);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password/:id/:token", resetPassword);
router.get("/email-verification/:code", emailVerification);

router.post("/emp_login", loginEmployee);
router.get("/emp_logout", logoutEmployee);
router.get("/get_user_data", verifyUser, getUserData);

router.post("/all_data", employeeFormAllData);

// Fetch data to pending with this API

router.get("/pendingdata/:email?", AddleadsAlldata);
router.get("/getpendingdatas/:email?", fetchPendingData);
router.delete("/deletePendingData/:id", deletePendingData);

// // Send Approved data to database With this API
router.post("/submit-approved-data", sendApprovedData);

// // Fetch Approved data to disbursed_data table with this API
router.get("/approved-data/:email?", fetchApprovedData);

// // Send Rejected data to database With this API
router.post("/submit-rejct-data", sendRejectedData);

// // Fetch Rejected data to rejected_data table with this API
router.get("/rejected-data/:email?", fetchRejectedData);

export default router;
