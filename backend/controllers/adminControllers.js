import {
  CibilIssueData,
  CustomerCardData,
  CustomerLoanData,
} from "../models/customerModels.js";
import {
  DisbursedData,
  Employee,
  FormalData,
  PendingFormData,
  RejectedData,
} from "../models/employeeModels.js";

import moment from "moment";

// fetch all the data from FormalData with this API

export const getAdminFormAllData = async (req, res) => {
  try {
    let query = {};
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

    const userData = await FormalData.find(query);

    if (!userData) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch all the data from pendingFormData with this API

export const fetchAdminPendingData = async (req, res) => {
  try {
    const { Status } = req.params;
    let query = {};
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

    const userData = await PendingFormData.find({ Status, ...query });

    if (!userData) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch all the data from DisbursedData with this API

export const fetchAdminDisbursedData = async (req, res) => {
  try {
    const { Status } = req.params;
    let query = {};
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

    const userData = await DisbursedData.find({ Status, ...query });

    if (!userData) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch all the data from RejectedData with this API

export const fetchAdminRejectedData = async (req, res) => {
  try {
    const { Status } = req.params;
    let query = {};
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

    const userData = await RejectedData.find({ Status, ...query });

    if (!userData) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch Team Leaders details

export const teamLeaderDetails = async (req, res) => {
  try {
    // Fetch employee details based on the condition
    const employees = await Employee.find({ userType: "Team Leader" });

    // Return the employee details
    return res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Login Lead Data API
export const deleteLoginLeadData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await FormalData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Pending Data API
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

// Delete Disbursed Data API
export const deleteDisbursedData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await DisbursedData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Rejected Data API
export const deleteRejectedData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await RejectedData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch CustomerLoanData with this API

export const getCustomerLoanData = async (req, res) => {
  try {
    const loanData = await CustomerLoanData.find({});

    if (!loanData || loanData.length === 0) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(loanData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete CustomerLoanData with this API

export const deleteCustomerLoanData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CustomerLoanData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get customer Card data with this API

export const getCustomerCardData = async (req, res) => {
  try {
    const cardData = await CustomerCardData.find({});

    if (!cardData || cardData.length === 0) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(cardData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete customer Card data with this API
export const deleteCustomerCarddata = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CustomerCardData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get cibilIssue data with this Api

export const getCibilData = async (req, res) => {
  try {
    const cibilData = await CibilIssueData.find({});

    if (!cibilData || cibilData.length === 0) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    console.log("Data retrieved");
    res.status(200).json(cibilData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete cibilIssue data with this Api

export const deleteCibileIssuedata = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CibilIssueData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
