//imports
const express = require("express");
const cookie = require("cookie");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");

//Middleware to parse
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, { cors: "*" });
const cors = require("cors");
const bodyParser = require("body-parser");
const { initNewGameState, gameLoop } = require("./game/Game");
const { FRAME_RATE, CHARACTER_HORIZONTAL_SPEED, CHARACTER_JUMP_OFFSET } = require("./utils/constants");
const { makeid } = require("./utils/utilities");
const port = 3001;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Socket Maps
const clientToRoom = {};
const roomToState = {};

io.on("connection", (client) => {
  console.log("Client id:", client.id);

  client.on("keyDown", keyDown);
  client.on("keyUp", keyUp);
  client.on("createdRoom", createRoom);
  client.on("joinRoom", joinRoom);

  function createRoom() {
    const roomId = makeid(10);
    const state = initNewGameState();
    client.join(roomId);
    client.role = 1;
    clientToRoom[client.id] = roomId;
    roomToState[roomId] = state;
    client.emit("init", roomId);
  }

  function joinRoom(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);

    if (room) {
      const numOfUsers = room.size;
      if (numOfUsers === 1) {
        //Join room
        client.join(roomId);
        client.role = 2;
        clientToRoom[client.id] = roomId;
        const roomState = roomToState[roomId];
        if (roomState) startGame(roomState, roomId);
      } else if (numOfUsers > 1) {
        client.emit("gameInProgress", roomId);
      } else {
        client.emit("invalidRoom", roomId);
      }
    } else {
      client.emit("invalidRoom", roomId);
    }
  }

  function keyDown(key) {
    const roomId = clientToRoom[client.id];
    const state = roomToState[roomId];
    switch (key) {
      case "a":
        state.players[client.role - 1].velocity.x = -CHARACTER_HORIZONTAL_SPEED;
        break;
      case "d":
        state.players[client.role - 1].velocity.x = CHARACTER_HORIZONTAL_SPEED;
        break;
      case "w":
        if (state.players[client.role - 1].onGround) {
          state.players[client.role - 1].velocity.y = CHARACTER_JUMP_OFFSET;
          state.players[client.role - 1].onGround = false;
        }
        break;
      case "s":
        if (!state.players[client.role - 1].attacking) {
          state.players[client.role - 1].attacking = true;

          setTimeout(() => {
            state.players[client.role - 1].attacking = false;
          }, (1000 / FRAME_RATE) * 2);
        }
        break;
    }
  }

  function keyUp(key) {
    const roomId = clientToRoom[client.id];
    const state = roomToState[roomId];

    switch (key) {
      case "a":
        state.players[client.role - 1].velocity.x = 0;
        break;
      case "d":
        state.players[client.role - 1].velocity.x = 0;
        break;
    }
  }
});

function startGame(state, roomId) {
  const interval = setInterval(() => {
    const decision = gameLoop(state);

    if (!decision) {
      console.log(JSON.stringify(state));
      io.sockets.in(roomId).emit("gameSnapShot", JSON.stringify(state));
    } else {
      clearInterval(interval);
      io.sockets.in(roomId).emit("gameEnded", decision);
    }
  }, 1000 / FRAME_RATE);

  const timer = setInterval(() => {
    if (state.timeLeft > 0) {
      state.timeLeft--;
    } else {
      clearInterval(timer);
      clearInterval(interval);
    }
  }, 1000);
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Enables session
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/", () => console.log("Connected to db!"));

//Middleware
app.use("/api/user/", userRoutes);

const http = require("http");

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
