const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

router(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running in port 5000");
});
