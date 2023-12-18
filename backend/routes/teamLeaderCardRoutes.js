import express from "express";
import {
  deleteCardDisbursedData,
  deleteCardPendingData,
  deleteCardRejectedData,
  fetchTeamLeaderCardDisbursedData,
  fetchTeamLeaderCardPendingData,
  fetchTeamLeaderCardRejectedData,
  getTeamLeaderCardFormAllData,
} from "../controllers/teamLeaderCardControllers.js";

const tl_card_routes = express.Router();

tl_card_routes.get(
  "/card_fetchAlldata/:TL_Name?",
  getTeamLeaderCardFormAllData
);

tl_card_routes.get(
  "/card_getpendingtldatas/:TL_Name?",
  fetchTeamLeaderCardPendingData
);

tl_card_routes.get(
  "/card_getdisbursedtldatas/:TL_Name?",
  fetchTeamLeaderCardDisbursedData
);

tl_card_routes.get(
  "/card_getrejectedtldatas/:TL_Name?",
  fetchTeamLeaderCardRejectedData
);

tl_card_routes.delete("/card_deletetlPendingData/:id", deleteCardPendingData);

tl_card_routes.delete(
  "/card_deletetldisbursedData/:id",
  deleteCardDisbursedData
);

tl_card_routes.delete("/card_deletetlrejectedData/:id", deleteCardRejectedData);

export default tl_card_routes;
