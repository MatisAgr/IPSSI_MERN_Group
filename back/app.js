require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 8080;

const mongoose = require("mongoose");
const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUrl = `${dbDialect}://${dbHost}:${dbPort}/${dbName}`;

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log(`Connected to the ${dbDialect} database!`);
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use(cors());

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});