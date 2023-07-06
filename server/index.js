const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const server = http.createServer(app);

server.listen(5000, () => console.log("Listening on port 5000..."));
