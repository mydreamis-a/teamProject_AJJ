const { log } = console;

const PORT = 8282;
const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");
const ejs = require("ejs");

const app = express();
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});
const io = socketio(server);