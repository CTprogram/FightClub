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
const port = 3001;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", (client) => {
  console.log("Client id:", client.id);

  const state = initNewGameState();

  client.on("keyDown", keyDown);
  client.on("keyUp", keyUp);

  function keyDown(key) {
    console.log(key, ' pressed');
    switch (key) {
      case "a":
        state.players[0].velocity.x = -CHARACTER_HORIZONTAL_SPEED;
        break;
      case "d":
        state.players[0].velocity.x = CHARACTER_HORIZONTAL_SPEED;
        break;
      case "w":
        if(state.players[0].onGround){
          state.players[0].velocity.y = CHARACTER_JUMP_OFFSET;
          state.players[0].onGround = false;
        }
        break;
      case "s":
        if(!state.players[0].attacking) {
          state.players[0].attacking = true;

          setTimeout(() => {
            state.players[0].attacking = false;
          }, (1000 / FRAME_RATE) * 3);
        }
        break;
    }
  }

  function keyUp(key) {
    switch (key) {
      case "a":
        state.players[0].velocity.x = 0;
        break;
      case "d":
        state.players[0].velocity.x = 0;
        break;
    }
  }

  startGame(state, client);
});

function startGame(state, client) {
  const interval = setInterval(() => {
    const decision = gameLoop(state);

    if (!decision) {
      console.log(JSON.stringify(state));
      client.emit("gameSnapShot", JSON.stringify(state));
    } else {
      clearInterval(interval);
      client.emit("gameEnded", decision);
    }
  }, 1000 / FRAME_RATE);
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
mongoose.connect("mongodb://localhost:27017/", () =>
  console.log("Connected to db!")
);

//Middleware
app.use("/api/user/", userRoutes);

const http = require("http");

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
