require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ info: "API routes at /api/v1/todos" }).status(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
