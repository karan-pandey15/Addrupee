import {
  DisbursedData,
  Employee,
  FormalData,
  PendingFormData,
  RejectedData,
} from "../models/employeeModels.js";

import moment from "moment";

// fetch all the data from FormalData with this API
export const getTeamFormAllData = async (req, res) => {
  try {
    let query = {};
    const { filter } = req.query;

    // If TL_Name is provided in the request parameters
    const { TL_Name } = req.params;

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

    // If TL_Name is provided, fetch data based on the TL_Name
    const userData = await FormalData.find({ TL_Name, ...query });

    if (!userData) {
      console.log("No data found for the provided TL_Name");
      return res
        .status(404)
        .json({ message: "No data found for the provided TL_Name" });
    }

    console.log("Data retrieved for the provided TL_Name");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fetch all the data from pendingFormData with this API

export const fetchTLPendingData = async (req, res) => {
  try {
    let query = {};

    // If TL_Name is provided in the request parameters
    const { TL_Name } = req.params;

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

    let userData;

    if (Status) {
      userData = await PendingFormData.find({ TL_Name, Status, ...query });
    } else {
      userData = await PendingFormData.find({ TL_Name, ...query });
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

// fetch all the data from DisbursedData with this API

export const fetchTlDisbursedData = async (req, res) => {
  try {
    let query = {};

    // If TL_Name is provided in the request parameters
    const { TL_Name } = req.params;
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

    let userData;

    if (Status) {
      userData = await DisbursedData.find({ TL_Name, Status, ...query });
    } else {
      userData = await DisbursedData.find({ TL_Name, ...query });
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

// fetch all the data from RejectedData with this API

export const fetchTlRejectedData = async (req, res) => {
  try {
    let query = {};

    // If TL_Name is provided in the request parameters
    const { TL_Name } = req.params;
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

    let userData;

    if (Status) {
      userData = await RejectedData.find({ TL_Name, Status, ...query });
    } else {
      userData = await RejectedData.find({ TL_Name, ...query });
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

// Fetch Team details

export const teamDetails = async (req, res) => {
  try {
    // Get TL_Name from the URL parameters
    const TL_Name = req.params.TL_Name;

    // Fetch employee details based on the condition
    const employees = await Employee.find({ TL_Name: TL_Name });

    // Check if any employees were found
    if (employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for the given TL_Name." });
    }

    // Return the employee details
    return res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal server error" });
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
