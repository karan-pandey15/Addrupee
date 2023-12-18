import express from "express";

import {
  deleteCardDisbursedData,
  deleteCardLoginLeadData,
  deleteCardPendingData,
  deleteCardRejectedData,
  fetchCardAdminDisbursedData,
  fetchCardAdminPendingData,
  fetchCardAdminRejectedData,
  getCardAdminFormAllData,
} from "../controllers/adminCardControllers.js";

const admin_card_routes = express.Router();

admin_card_routes.get("/fetchCardAdminAlldata", getCardAdminFormAllData);

admin_card_routes.get(
  "/getCardpendingadmindatas/:Status",
  fetchCardAdminPendingData
);
admin_card_routes.get(
  "/getCarddisbursedadmindatas/:Status",
  fetchCardAdminDisbursedData
);
admin_card_routes.get(
  "/getCardrejectedadmindatas/:Status",
  fetchCardAdminRejectedData
);

admin_card_routes.delete(
  "/deleteCardadminLoginLeadData/:id",
  deleteCardLoginLeadData
);
admin_card_routes.delete(
  "/deleteCardadminPendingData/:id",
  deleteCardPendingData
);
admin_card_routes.delete(
  "/deleteCardadmindisbursedData/:id",
  deleteCardDisbursedData
);
admin_card_routes.delete(
  "/deleteCardadminrejectedData/:id",
  deleteCardRejectedData
);

export default admin_card_routes;
