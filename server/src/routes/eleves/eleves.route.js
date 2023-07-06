const express = require("express");
const {
  httpGetEleves,
  httpAddEleve,
  httpDeleteEleve,
  httpGetEleveById,
} = require("./eleves.controller");
const app = express();
const ElevesRouter = express.Router();

ElevesRouter.get("/", httpGetEleves);
ElevesRouter.get("/:id", httpGetEleveById);
ElevesRouter.post("/", httpAddEleve);
ElevesRouter.delete("/:id", httpDeleteEleve);

module.exports = ElevesRouter;
