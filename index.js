const io = require("socket.io");
const httpServer = require("http").createServer();

const server = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
server.on("connection", (client) => {
  console.log("CONNECTED");
});
server.listen(7000);

require("dotenv").config();
const { DISCORD_BOT_ID, CLIENT_ID, GUILD_ID } = process.env;

const { InitRest } = require("./src/rest.js");
const { client } = require("./src/client.js");

InitRest();
client.login(DISCORD_BOT_ID);
