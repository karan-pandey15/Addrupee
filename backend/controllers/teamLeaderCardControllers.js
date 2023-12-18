import {
  CardFormAlData,
  CardPendingFormData,
  CardDisbursedData,
  CardRejectedData,
} from "../models/employeeCardModels.js";

import { config } from "dotenv";
import moment from "moment";

config();

// fetch all the data from CardFormAlData with this API

export const getTeamLeaderCardFormAllData = async (req, res) => {
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
    const userData = await CardFormAlData.find({ TL_Name, ...query });

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

// fetch all the data from CardPendingFormData with this API

export const fetchTeamLeaderCardPendingData = async (req, res) => {
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
      userData = await CardPendingFormData.find({ TL_Name, Status, ...query });
    } else {
      userData = await CardPendingFormData.find({ TL_Name, ...query });
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

// fetch all the data from CardDisbursedData with this API

export const fetchTeamLeaderCardDisbursedData = async (req, res) => {
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
      userData = await CardDisbursedData.find({ TL_Name, Status, ...query });
    } else {
      userData = await CardDisbursedData.find({ TL_Name, ...query });
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

// fetch all the data from CardRejectedData with this API

export const fetchTeamLeaderCardRejectedData = async (req, res) => {
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
      userData = await CardRejectedData.find({ TL_Name, Status, ...query });
    } else {
      userData = await CardRejectedData.find({ TL_Name, ...query });
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

// Delete Pending Data API
export const deleteCardPendingData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CardPendingFormData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Disbursed Data API
export const deleteCardDisbursedData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CardDisbursedData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Rejected Data API
export const deleteCardRejectedData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CardRejectedData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
