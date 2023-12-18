import express from "express";
import {
  deleteCardPendingData,
  employeeCardFormApply,
  fetchCardApprovedData,
  fetchCardFormAlData,
  fetchCardPendingData,
  fetchCardRejectedData,
  sendCardApprovedData,
  sendCardRejectedData,
} from "../controllers/employeeCardControllers.js";

const card_routes = express.Router();

card_routes.post("/card_all_data", employeeCardFormApply);

// Fetch data to Login Leads with this API

card_routes.get("/card_pendingdata/:email?", fetchCardFormAlData);

// Fetch data to pending with this API
card_routes.get("/card_getpendingdatas/:email?", fetchCardPendingData);

card_routes.delete("/card_deletePendingData/:id", deleteCardPendingData);

// // Send Approved data to database With this API
card_routes.post("/card_submit-approved-data", sendCardApprovedData);

// // Fetch Approved data to disbursed_data table with this API
card_routes.get("/card_approved-data/:email?", fetchCardApprovedData);

// // Send Rejected data to database With this API
card_routes.post("/card_submit-rejct-data", sendCardRejectedData);

// // Fetch Rejected data to rejected_data table with this API
card_routes.get("/card_rejected-data/:email?", fetchCardRejectedData);

export default card_routes;
