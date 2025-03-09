const express = require("express");
const cors = require("cors");

const docRoutes = require("./routes/docRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/docs", docRoutes);
app.use("/users", userRoutes);

module.exports = app;
