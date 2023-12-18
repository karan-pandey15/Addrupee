import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Customer,
  CustomerCardData,
  CustomerLoanData,
} from "../models/customerModels.js";
import { config } from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

config();

const secretKey = process.env.SECRET_KEY;

// Generate a secure random verification code
const generateVerificationCode = () => {
  return crypto.randomBytes(32).toString("hex");
};

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
          const user = await Customer.findOne({ email: decoded.email });

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

export const getCustomerData = (req, res) => {
  console.log("User Data:", req.name, req.email);
  return res.json({
    Status: "Success",
    name: req.name,
    email: req.email,
  });
};

// Add this function to validate the email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const registerCustomer = async (req, res) => {
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
    const existingUser = await Customer.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingUser) {
      return res.json({
        Error:
          "User already exists. Please use a different email or phone number.",
      });
    }

    // Create new employee
    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
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
      <a href="http://localhost:3000/cust-email-verification/${verificationCode}">Verify</a>
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
    newCustomer.verificationCode = verificationCode;
    await newCustomer.save();

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

export const CustEmailVerification = async (req, res) => {
  const { code } = req.params;

  try {
    // Find the user by verification code
    const user = await Customer.findOne({ verificationCode: code });

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

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await Customer.findOne({ email });

  if (!user) {
    return res.json({ Error: "No Such Email Existed" });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const { name, email } = user;
    try {
      const token = jwt.sign({ email, name }, secretKey, {
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

    return res.json({ Status: "Success", name, email });
  } else {
    return res.json({ Error: "Password not Matched" });
  }
};

export const CustforgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Customer.findOne({ email: email });

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
          <a href="http://localhost:3000/cust_reset_password/${user._id}/${token}">Reset</a>
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

export const CustresetPassword = async (req, res) => {
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
            Customer.findByIdAndUpdate({ _id: id }, { password: hash })
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

export const logoutCustomer = (req, res) => {
  // Clear the cookie
  res.clearCookie("token");
  res.json({ Status: "Success" });
};

export const customerLoanApply = async (req, res) => {
  const formData = req.body;

  try {
    const customerLoanData = new CustomerLoanData(formData);
    await customerLoanData.save();

    console.log("Form data submitted successfully");
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res
      .status(500)
      .json({ error: "Failed to submit the form", details: err.message });
  }
};

export const customerCardApply = async (req, res) => {
  try {
    const customerCardData = req.body;
    const newCustomerCard = new CustomerCardData(customerCardData);
    const savedCustomerCard = await newCustomerCard.save();
    res.status(201).json(savedCustomerCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
