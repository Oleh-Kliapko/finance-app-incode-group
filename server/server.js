"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let intervalForUpdateData = 5000;
let intervalTimer;
let connectedSocket;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
  "EA", //Electronic Arts
  "MA", //Mastercard
  "DXC", //DXC Technology Co
  "MDB", //MongoDB Inc.
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  intervalTimer = setInterval(function () {
    getQuotes(socket);
  }, intervalForUpdateData);

  socket.on("disconnect", function () {
    clearInterval(intervalTimer);
  });
}

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/interval", (req, res) => {
  res.json({ intervalForUpdateData });
});

app.post("/interval", (req, res) => {
  intervalForUpdateData = req.body.newInterval;

  if (connectedSocket) {
    clearInterval(intervalTimer);
    trackTickers(connectedSocket);
  }

  res.status(200).json({
    intervalForUpdateData,
    message: `Interval updated successfully to ${
      intervalForUpdateData / 1000
    } sec.`,
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  connectedSocket = socket;
  socket.on("start", () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
