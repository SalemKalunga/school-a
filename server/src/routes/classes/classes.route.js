const express = require("express");
const {
  httpGetClasses,
  httpAddClasse,
  httpGetClasse,
  httpDeleteClasse,
} = require("./classes.controller");
const app = express();
const ClassesRouter = express.Router();

ClassesRouter.get("/", httpGetClasses);
ClassesRouter.get("/:id", httpGetClasse);
ClassesRouter.post("/", httpAddClasse);
ClassesRouter.delete("/:id", httpDeleteClasse);

module.exports = ClassesRouter;
