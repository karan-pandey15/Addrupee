import express from "express";
import {
  deleteDisbursedData,
  deletePendingData,
  deleteRejectedData,
  fetchTLPendingData,
  fetchTlDisbursedData,
  fetchTlRejectedData,
  getTeamFormAllData,
  teamDetails,
} from "../controllers/teamLeaderControllers.js";

const router = express.Router();

router.get("/fetchAlldata/:TL_Name?", getTeamFormAllData);
router.get("/getpendingtldatas/:TL_Name?", fetchTLPendingData);
router.get("/getdisbursedtldatas/:TL_Name?", fetchTlDisbursedData);
router.get("/getrejectedtldatas/:TL_Name?", fetchTlRejectedData);
router.get("/getteamdetails/:TL_Name?", teamDetails);

router.delete("/deletetlPendingData/:id", deletePendingData);
router.delete("/deletetldisbursedData/:id", deleteDisbursedData);
router.delete("/deletetlrejectedData/:id", deleteRejectedData);

export default router;
