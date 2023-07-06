const express = require("express");
const {
  httpGetAnnees,
  httpAddAnnee,
  httpGetAnnee,
  httpDeleteAnnee,
} = require("./annees.controller");
const app = express();
const AnneesRouter = express.Router();

AnneesRouter.get("/", httpGetAnnees);
AnneesRouter.get("/:id", httpGetAnnee);
AnneesRouter.post("/", httpAddAnnee);
AnneesRouter.delete("/:id", httpDeleteAnnee);

module.exports = AnneesRouter;
