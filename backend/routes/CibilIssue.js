import express from "express";
import multer from "multer";
import path from "path";
import { body, validationResult } from "express-validator";
import { CibilIssueData } from "../models/customerModels.js";

const cibil_issue = express();
cibil_issue.use(express.json());
cibil_issue.use(express.static("public"));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cibil_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Validation middleware using express-validator
const validateCibilData = [
  body("Customer_Name").notEmpty().withMessage("Customer Name is required"),
  body("Pan_Card").notEmpty().withMessage("Pan Card is required"),
  // Add more validation rules for other fields as needed
];

// API endpoint to handle file uploads along with other data
cibil_issue.post(
  "/cibil_issue",
  upload.fields([
    { name: "Upload_Cibil", maxCount: 1 },
    { name: "Upload_Dontated_Receipt", maxCount: 1 },
  ]),
  validateCibilData,
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract other form data from the request body
      const cibilData = req.body;

      // Extract file paths from the req.files object (added by Multer)
      const uploadCibilPath = req.files["Upload_Cibil"][0].path;
      const uploadReceiptPath = req.files["Upload_Dontated_Receipt"][0].path;

      // Add file paths to the cibil data
      cibilData.Upload_Cibil = uploadCibilPath;
      cibilData.Upload_Dontated_Receipt = uploadReceiptPath;

      // Create a new cibil instance with the updated data
      const newCibilData = new CibilIssueData(cibilData);

      // Save the cibil data to the database
      const savedCibilData = await newCibilData.save();

      // Respond with the saved cibil data
      res.status(201).json(savedCibilData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default cibil_issue;
