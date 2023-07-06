const express = require("express");
const {
  httpGetAnneeScholaires,
  httpAddAnneeScholaire,
  httpGetAnneeScholaire,
  httpDeleteAnneeScholaire,
} = require("./annee-scholaires.controller");
const app = express();
const AnneeScholairesRouter = express.Router();

AnneeScholairesRouter.get("/", httpGetAnneeScholaires);
AnneeScholairesRouter.get("/:id", httpGetAnneeScholaire);
AnneeScholairesRouter.post("/", httpAddAnneeScholaire);
AnneeScholairesRouter.delete("/:id", httpDeleteAnneeScholaire);

module.exports = AnneeScholairesRouter;
