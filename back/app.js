require('dotenv').config();

const express = require("express");
const cors = require("cors");
const ws = require("ws"); // Import ws
const WebSocket = require("ws");
const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 8080;

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  ws.on("message", function incoming(message) {
      console.log("received: %s", message);
      ws.send("le message a ete recu");
  });
});

const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
const dbUrl = `${dbURL}`;

const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");

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

app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});