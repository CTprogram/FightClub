//imports
const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, { cors: "*" });
const cors = require("cors");
const bodyParser = require("body-parser");
const { initNewGameState, gameLoop } = require("./game/Game");
const { FRAME_RATE } = require("./utils/constants");
const port = 3001;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", (client) => {
  console.log('Client id:', client.id);

  const state = initNewGameState();

  client.on('keyDown', keyDown);
  client.on('keyUp', keyUp);

  function keyDown(key) {
    switch (key) {
      case 'a':
        state.players[0].velocity.x = -5;
        break;
      case 'd':
        state.players[0].velocity.x = 5;
        break;
      case 'w':
        state.players[0].velocity.y = -20;
        break;
    }
  }

  function keyUp (key) {
    switch (key) {
      case 'a':
        state.players[0].velocity.x = 0;
        break;
      case 'd':
        state.players[0].velocity.x = 0;
        break;
    }
  }
  
  startGame(state, client);
});

function startGame(state, client) {
  const interval = setInterval(() => {
    const decision = gameLoop(state);
    
    if(!decision) {
      console.log(JSON.stringify(state));
      client.emit('gameSnapShot', JSON.stringify(state));
    } else {
      clearInterval(interval);
      client.emit('gameEnded', decision);
    }
  }, 1000 / FRAME_RATE);
}


httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
