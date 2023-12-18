import express from "express";

import {
  deleteCibileIssuedata,
  deleteCustomerCarddata,
  deleteCustomerLoanData,
  deleteDisbursedData,
  deleteLoginLeadData,
  deletePendingData,
  deleteRejectedData,
  fetchAdminDisbursedData,
  fetchAdminPendingData,
  fetchAdminRejectedData,
  getAdminFormAllData,
  getCibilData,
  getCustomerCardData,
  getCustomerLoanData,
  teamLeaderDetails,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/fetchAdminAlldata", getAdminFormAllData);
router.get("/getpendingadmindatas/:Status", fetchAdminPendingData);
router.get("/getdisbursedadmindatas/:Status", fetchAdminDisbursedData);
router.get("/getrejectedadmindatas/:Status", fetchAdminRejectedData);
router.get("/getteamleaderdetails", teamLeaderDetails);

router.delete("/deleteadminLoginLeadData/:id", deleteLoginLeadData);
router.delete("/deleteadminPendingData/:id", deletePendingData);
router.delete("/deleteadmindisbursedData/:id", deleteDisbursedData);
router.delete("/deleteadminrejectedData/:id", deleteRejectedData);

// Get Customer Data Routes
router.get("/get_cust_loan_data", getCustomerLoanData);
router.delete("/delete_cust_loan_data/:id", deleteCustomerLoanData);
router.get("/get_cust_card_data", getCustomerCardData);
router.delete("/delete_card_data/:id", deleteCustomerCarddata);

// get cibileIssue  data with this API
router.get("/get_cibilIssue_data", getCibilData);
router.delete("/delete_cibilIssue_data", deleteCibileIssuedata);

export default router;
