import {
  CardFormAlData,
  CardPendingFormData,
  CardDisbursedData,
  CardRejectedData,
} from "../models/employeeCardModels.js";

import moment from "moment";

// fetch all the data from CardFormAlData with this API

export const getCardAdminFormAllData = async (req, res) => {
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

    const userData = await CardFormAlData.find(query);

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

// export const getCardAdminFormAllData = async (req, res) => {
//   try {
//     const userData = await CardFormAlData.find({});

//     if (!userData) {
//       console.log("No data found");
//       return res.status(404).json({ message: "No data found" });
//     }

//     console.log("Data retrieved");
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// fetch all the data from CardPendingFormData with this API

export const fetchCardAdminPendingData = async (req, res) => {
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

    const userData = await CardPendingFormData.find({ Status, ...query });

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

// export const fetchCardAdminPendingData = async (req, res) => {
//   try {
//     const { Status } = req.params;
//     const userData = await CardPendingFormData.find({ Status });

//     if (!userData) {
//       console.log("No data found");
//       return res.status(404).json({ message: "No data found" });
//     }

//     console.log("Data retrieved");
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const fetchCardAdminDisbursedData = async (req, res) => {
//   try {
//     const { Status } = req.params;
//     const userData = await CardDisbursedData.find({ Status });

//     if (!userData) {
//       console.log("No data found");
//       return res.status(404).json({ message: "No data found" });
//     }

//     console.log("Data retrieved");
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// fetch all the data from CardDisbursedData with this API

export const fetchCardAdminDisbursedData = async (req, res) => {
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

    const userData = await CardDisbursedData.find({ Status, ...query });

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

// fetch all the data from CardRejectedData with this API

export const fetchCardAdminRejectedData = async (req, res) => {
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

    const userData = await CardRejectedData.find({ Status, ...query });

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

// export const fetchCardAdminRejectedData = async (req, res) => {
//   try {
//     const { Status } = req.params;
//     const userData = await CardRejectedData.find({ Status });

//     if (!userData) {
//       console.log("No data found");
//       return res.status(404).json({ message: "No data found" });
//     }

//     console.log("Data retrieved");
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Delete Login Lead Card Data API
export const deleteCardLoginLeadData = async (req, res) => {
  const id = req.params.id;
  try {
    // Perform deletion in your database using the provided ID
    await CardFormAlData.findByIdAndDelete(id);

    // Respond with a success message
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Pending Card Data API
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

// Delete Disbursed Card  Data API
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

// Delete Rejected Card Data API
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
