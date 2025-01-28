require('dotenv').config();

const express = require("express");
const cors = require("cors");
const ws = require("ws"); // Import ws
const WebSocket = require("ws");
const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 8080;

const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
const dbUrl = `${dbURL}`;

const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log(`Connected to the MongoDB database!`);
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);


////////////////////////// WebSocket //////////////////////////

// Importer les modules WebSocket et HTTP
const http = require('http');
const WebSocket = require('ws');

// Créer un serveur HTTP à partir de l'application Express
const server = http.createServer(app);

// Créer le serveur WebSocket
const wss = new WebSocket.Server({ server });

// URL du WebSocket BitMEX
const bitmexWSUrl = 'wss://ws.bitmex.com/realtime';

// Cache des données
let cachedData = {};

// Connexion au WebSocket BitMEX
const bitmexWS = new WebSocket(bitmexWSUrl);

bitmexWS.on('open', () => {
    const subscribeMessage = {
        op: 'subscribe',
        args: ['trade:XBTUSD', 'tradeBin1m']
    };
    bitmexWS.send(JSON.stringify(subscribeMessage));
});

bitmexWS.on('message', (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.table && parsedData.action) {
        cachedData[parsedData.table] = parsedData.data;
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedData));
            }
        });
    }
});

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(cachedData));
});

server.listen(PORT, () => {
    console.log(`Server and WebSocket are running on port ${PORT}`);
});