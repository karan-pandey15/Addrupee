import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import csv from "fast-csv";
import fs from "fs";
import {
  DisbursedData,
  FormalData,
  PendingFormData,
  RejectedData,
} from "../models/employeeModels.js";

const csv_route = express();

csv_route.use(bodyParser.urlencoded({ extended: false }));
csv_route.use(bodyParser.json());

// multer config
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

csv_route.post("/import-csv", upload.single("csvFile"), async (req, res) => {
  console.log(req.file.path);

  try {
    await uploadCsv(req.file.path, __dirname);
    res.send("Records Imported Successfully!");
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).send("Internal Server Error");
  }
});

const uploadCsv = async (filePath, appDir) => {
  try {
    let correctedFilePath = filePath.replace(/\\/g, "/");
    let stream = fs.createReadStream(correctedFilePath);
    let csvDataColl = [];
    let fileStream = csv
      .parse()
      .on("data", (data) => {
        csvDataColl.push(data);
      })
      .on("end", async () => {
        // Remove the header row from CSV data
        csvDataColl.shift();
        // Convert CSV data to an array of objects
        const formDataArray = csvDataColl.map((data) => {
          return {
            Status: data[0],
            Product_Loan: data[1],
            Bank_Name: data[2],
            Customer_Name: data[3],
            Father_Name: data[4],
            Mother_Name: data[5],
            Mobile: data[6],
            Personal_Email: data[7],
            Pan_Card: data[8],
            Customer_Location: data[9],
            Company_Name: data[10],
            Dob: data[11],
            Login_Date: data[12],
            Gender: data[13],
            Religion: data[14],
            Income_Source: data[15],
            Marital_Status: data[16],
            Spouse_Name: data[17],
            Qualification: data[18],
            Property_Status: data[19],
            Aadhar_Card_No: data[20],
            Current_Address_Line1: data[21],
            Current_Address_Line2: data[22],
            Current_City: data[23],
            Current_Landmark: data[24],
            Current_State: data[25],
            Current_Pin: data[26],
            Permanent_Address_Line1: data[27],
            Permanent_Address_Line2: data[28],
            Permanent_City: data[29],
            Permanent_Landmark: data[30],
            Permanent_State: data[31],
            Permanent_Pin: data[32],
            Designation: data[33],
            Current_Company_Work_Experience: data[34],
            Total_Work_Experience: data[35],
            Company_Type: data[36],
            Official_Mail: data[37],
            Company_Address: data[38],
            Company_City: data[39],
            Company_State: data[40],
            Company_Pin: data[41],
            Salary_Account_BankName: data[42],
            Annual_Ctc: data[43],
            Net_Salary: data[44],
            Obligations: data[45],
            Scheme_Offered: data[46],
            Loan_Amount_Applied: data[47],
            Tenure_Of_Loan: data[48],
            Credit_Card_Obligation: data[49],
            Reference1_FullName_Relative: data[50],
            Reference1_MobileNo: data[51],
            Reference1_Address1: data[52],
            Reference1_City: data[53],
            Reference1_State: data[54],
            Reference1_Pin: data[55],
            Reference2_FullName_Friend: data[56],
            Reference2_MobileNo: data[57],
            Reference2_Address1: data[58],
            Reference2_City: data[59],
            Reference2_State: data[60],
            Reference2_Pin: data[61],
            Caller_Name: data[62],
            TL_Name: data[63],
            Manager_Name: data[64],
            Disbursal_BankName: data[65],
            Loan_Application_No: data[66],
            Approved_Amount: data[67],
            Disbursal_Loan_Amount: data[68],
            Inhand_Disb_Account: data[69],
            Bt_Disb_Amount: data[70],
            Top_Up: data[71],
            Cibil: data[72],
            Tenure_Disbursal: data[73],
            Roi: data[74],
            Pf: data[75],
            Insurance: data[76],
            Emi: data[77],
            First_Emi_Date: data[78],
            Scheme: data[79],
            Login_Bank: data[80],
            Disbursal_Date: data[81],
            Dsa_Channel_Name: data[82],
            Rejection_Date: data[83],
            Rejection_Remark: data[84],
            Rejection_Description: data[85],
            email: data[86],
          };
        });

        // Filter data based on Status field
        const pendingFormDataArray = formDataArray.filter(
          (data) => data.Status === "Pending"
        );
        const disbursedDataArray = formDataArray.filter(
          (data) => data.Status === "Disbursed"
        );
        const rejectedDataArray = formDataArray.filter(
          (data) => data.Status === "Rejected"
        );

        // Insert data into MongoDB for each collection
        await FormalData.insertMany(formDataArray);

        if (pendingFormDataArray.length > 0) {
          await PendingFormData.insertMany(pendingFormDataArray);
        }

        if (disbursedDataArray.length > 0) {
          await DisbursedData.insertMany(disbursedDataArray);
        }

        if (rejectedDataArray.length > 0) {
          await RejectedData.insertMany(rejectedDataArray);
        }

        console.log("Form data submitted successfully");
      });
    stream.pipe(fileStream);
  } catch (error) {
    console.error("Error processing CSV:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export default csv_route;
