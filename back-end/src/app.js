const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
require("express-async-errors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
