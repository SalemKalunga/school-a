const express = require("express");
const {
  httpGetEleves,
  httpAddEleve,
  httpDeleteEleve,
  httpGetEleveById,
  httpConfirmeeEleve,
} = require("./eleves.controller");
const app = express();
const ElevesRouter = express.Router();

ElevesRouter.get("/", httpGetEleves);
ElevesRouter.get("/:id", httpGetEleveById);
ElevesRouter.post("/", httpAddEleve);
ElevesRouter.delete("/:id", httpDeleteEleve);
ElevesRouter.put("/:id", httpConfirmeeEleve);

module.exports = ElevesRouter;
