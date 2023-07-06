const express = require("express");
const {
  httpGetOptions,
  httpAddOption,
  httpGetOption,
  httpDeleteOption,
} = require("./options.controller");
const app = express();
const OptionsRouter = express.Router();

OptionsRouter.get("/", httpGetOptions);
OptionsRouter.get("/:id", httpGetOption);
OptionsRouter.post("/", httpAddOption);
OptionsRouter.delete("/:id", httpDeleteOption);

module.exports = OptionsRouter;
