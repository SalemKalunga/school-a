const express = require("express");
const {
  httpGetSections,
  httpAddSection,
  httpGetSection,
  httpDeleteSection,
} = require("./sections.controller");
const app = express();
const sectionsRouter = express.Router();

sectionsRouter.get("/", httpGetSections);
sectionsRouter.get("/:id", httpGetSection);
sectionsRouter.post("/", httpAddSection);
sectionsRouter.delete("/:id", httpDeleteSection);

module.exports = sectionsRouter;
