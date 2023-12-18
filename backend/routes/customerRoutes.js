import express from "express";
import {
  customerLoanApply,
  getCustomerData,
  logoutCustomer,
  loginCustomer,
  registerCustomer,
  verifyUser,
  CustEmailVerification,
  CustforgotPassword,
  CustresetPassword,
  customerCardApply,
} from "../controllers/customerControllers.js";

const router = express.Router();

router.post("/cust_register", registerCustomer);
router.post("/cust_login", loginCustomer);
router.get("/cust_logout", logoutCustomer);
router.post("/cust_forgot_password", CustforgotPassword);
router.post("/cust_reset_password/:id/:token", CustresetPassword);
router.get("/cust-email-verification/:code", CustEmailVerification);
router.get("/get_customer_data", verifyUser, getCustomerData);

router.post("/cust_loan_apply", customerLoanApply);
router.post("/cust_card_apply", customerCardApply);

export default router;
