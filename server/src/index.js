const http = require("http");

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const sectionsRouter = require("./routes/sections/sections.route");
const OptionsRouter = require("./routes/options/options.route");
const ClassesRouter = require("./routes/classes/classes.route");
const AnneesRouter = require("./routes/annees/annees.route");
const AnneeScholairesRouter = require("./routes/annee_scholaires/annee-scholaires.route");
const ElevesRouter = require("./routes/eleves/eleves.route");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", async (req, res) => {
  // const password = "123user";
  // const hashed = await bcrypt.hash(password, 13);
  // const isMatch = await bcrypt.compare(password, hashed);
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/sections", sectionsRouter);
app.use("/options", OptionsRouter);
app.use("/classes", ClassesRouter);
app.use("/annees", AnneesRouter);
app.use("/annee-scholaires", AnneeScholairesRouter);
app.use("/eleves", ElevesRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
module.exports = app;

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
