const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, { cors: "*" });
const port = 3001;

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", (client) => {
  console.log('Client id:', client.id);
});

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
