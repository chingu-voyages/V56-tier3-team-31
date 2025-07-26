require("dotenv").config();
const express = require("express");
console.log(process.env.Frontend_URL);

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.Frontend_URL],
    // methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    // allowedHeaders: [
    //   "Origin",
    //   "X-Requested-With",
    //   "Content-Type",
    //   "Accept",
    //   "X-Access-Token",
    // ],
    // preflightContinue: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

module.exports = { app, server, io };
