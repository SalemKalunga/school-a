const http = require("http");

const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const sectionsRouter = require("./routes/sections/sections.route");
const OptionsRouter = require("./routes/options/options.route");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/sections", sectionsRouter);
app.use("/options", OptionsRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
module.exports = app;

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
