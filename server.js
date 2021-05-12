const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require("cors");
require("./config/database");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.use("/api/v1/", router);

app.get("/", (req, res) => res.send("Running"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
