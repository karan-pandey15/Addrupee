import mongoose from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  is_verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
});

const customerLoanDataSchema = new mongoose.Schema({
  loanType: String,
  bankName: String,
  customerName: String,
  fatherName: String,
  motherName: String,
  mobileNo: String,
  officialMail: String,
  panCardNo: String,
  customerLocation: String,
  companyName: String,
  dob: String,
  gender: String,
  religion: String,
  applyDate: String,
});

const cibilSchema = new mongoose.Schema({
  Customer_Name: { type: String, required: true },
  Father_Name: { type: String, required: true },
  Mother_Name: { type: String, required: true },
  Mobile_No: { type: String, required: true },
  email: { type: String, required: true },
  Pan_No: { type: String, required: true },
  Customer_Location: { type: String, required: true },
  Company_Name: { type: String, required: true },
  dob: { type: String, required: true },
  Monthly_Salary: { type: String, required: true },
  Cibil_Score: { type: String, required: true },
  Resi_Status: { type: String, required: true },
  Upload_Cibil: { type: String, required: true },
  Upload_Dontated_Receipt: { type: String, required: true },
});

const customerCardSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  customerName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  officialMail: { type: String, required: true },
  panCardNo: { type: String, required: true },
  customerLocation: { type: String, required: true },
  companyName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String },
  religion: { type: String },
  applyDate: { type: String, required: true },
});

// career form schema
const CareerSchema = new mongoose.Schema({
  Customer_Name: { type: String, required: true },
  Father_Name: { type: String, required: true },
  Mobile_No: { type: String, required: true },
  email: { type: String, required: true },
  Customer_Location: { type: String, required: true },
  Upload_Cibil: { type: String, required: true },
});

// Hash the password before saving
customerSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

const Customer = mongoose.model("Customer", customerSchema);
const CibilIssueData = mongoose.model("CibilIssueData", cibilSchema);
const CareerData = mongoose.model("CareerFormData", CareerSchema);

const CustomerCardData = mongoose.model("CustomerCardData", customerCardSchema);

const CustomerLoanData = mongoose.model(
  "CustomerLoanData",
  customerLoanDataSchema
);

export {
  Customer,
  CustomerLoanData,
  CibilIssueData,
  CustomerCardData,
  CareerData,
};
