//imports
const express = require("express");
const cookie = require("cookie");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const userRoutes = require("./Routes/UserRoutes");
const oAuthRoutes = require("./Routes/OAuthRoutes");
const leaderboardRoutes = require("./Routes/Leaderboard");
//Middleware to parse
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, { cors: "*" });
const cors = require("cors");
const bodyParser = require("body-parser");
const { initNewGameState, gameLoop } = require("./game/Game");
const { FRAME_RATE, CHARACTER_HORIZONTAL_SPEED, CHARACTER_JUMP_OFFSET, PLAYER_ATTACK_FRAMES, ENEMY_ATTACK_FRAMES, DEATH_DELAY } = require("./utils/constants");
const { makeid } = require("./utils/utilities");
const port = 3001;

//connect to mongoDB
const conn = "mongodb://mongo:27017/game";

mongoose.connect(
  conn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  }
);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true, exposedHeaders: ["set-cookie"] }));

const sessionStore = MongoStore.create({ mongoUrl: conn });

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 60 * 60 * 24 * 7 * 100 },
  })
);

app.use(function (req, res, next) {
  let username = req.session.username ? req.session.username : "";
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    })
  );

  next();
});

app.use(passport.initialize());
app.use(passport.session());
//Middleware
app.use("/api/user/", userRoutes);
app.use("/auth/", oAuthRoutes);
app.use("/api/leaderboard/", leaderboardRoutes);

//Socket look up tables Maps
const clientToRoom = {};
const roomToUsers = {};
const roomToState = {};
const publicRoomIds = [];

io.on("connection", (client) => {
  console.log("Client id:", client.id);

  client.on("keyDown", keyDown);
  client.on("keyUp", keyUp);
  client.on("createdRoom", createRoom);
  client.on("joinRoom", joinRoom);
  client.on("joinPublicRoom", joinPublicRoom);

  function joinPublicRoom(username) {
    if(publicRoomIds.length > 0) {
      const publicRoomId = publicRoomIds.shift();
      joinRoom(publicRoomId, username);
    } else {
      createRoom(username, true);
    }
  }

  function createRoom(username, isPublicRoom = false) {
    const roomId = makeid(10);
    const state = initNewGameState();
    client.join(roomId);
    client.role = 1;
    clientToRoom[client.id] = roomId;
    roomToState[roomId] = state;
    roomToUsers[roomId] = [username];
    if(isPublicRoom) publicRoomIds.push(roomId);
    client.emit("init", roomId);
  }

  function joinRoom(roomId, username) {
    const room = io.sockets.adapter.rooms.get(roomId);

    if (room) {
      const numOfUsers = room.size;
      if (numOfUsers === 1) {
        //Join room
        client.join(roomId);
        client.role = 2;
        clientToRoom[client.id] = roomId;
        const roomState = roomToState[roomId];
        roomToUsers[roomId].push(username);
        client.emit("joinedGame");
        io.sockets.in(roomId).emit("updatePlayerNames", roomToUsers[roomId]);
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
    if (!state.players[client.role - 1].isDying) {
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
          const settings = client.role === 1 ? { frames: PLAYER_ATTACK_FRAMES, delay: 1000 } : { frames: ENEMY_ATTACK_FRAMES, delay: 0 };
          if (!state.players[client.role - 1].attacking) {
            state.players[client.role - 1].attacking = true;
            setTimeout(() => {
              state.players[client.role - 1].attacking = false;
            }, (1000 / FRAME_RATE) * settings.frames);
          }
          break;
      }
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
  let gameOverFlag = false;
  const interval = setInterval(() => {
    const decision = gameLoop(state);

    if (!decision) {
      console.log(JSON.stringify(state));
      io.sockets.in(roomId).emit("gameSnapShot", JSON.stringify(state));
    } else {
      if (!gameOverFlag) {
        setTimeout(() => {
          io.sockets.in(roomId).emit("gameEnded", decision, state);
          clearInterval(interval);
        }, DEATH_DELAY);
        gameOverFlag = true;
      }
      
      io.sockets.in(roomId).emit("gameSnapShot", JSON.stringify(state));
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

const http = require("http");

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log("Hello updated");
});
