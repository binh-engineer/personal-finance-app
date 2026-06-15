const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "API working" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});