const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("send location", (data) => {
    io.emit("recieve location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user disconnected", { id: socket.id });
  });
});
io.on("send", (data) => {
  console.log("BRO");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
