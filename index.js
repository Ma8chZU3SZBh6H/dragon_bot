const io = require("socket.io");
const httpServer = require("http").createServer();

require("dotenv").config();
const { DISCORD_BOT_ID, CLIENT_ID, GUILD_ID } = process.env;

const { InitRest } = require("./src/rest.js");
const { client } = require("./src/client.js");

InitRest();
client.login(DISCORD_BOT_ID);

const server = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
server.on("connection", (user) => {
  user.on("disconnect", (data) => {
    console.log(`${user.id} disconnected`);
  });
  user.on("getChannels", (serverID) => {
    console.log(serverID);
    if (serverID != null) {
      const channels = client.guilds.cache
        .find((guild) => guild.id == serverID)
        .channels.cache.filter((channel) => channel.type == "GUILD_TEXT")
        .map((channel) => {
          return {
            name: channel.name,
          };
        });
      user.emit("setChannels", channels);
    }
  });
  const servers = client.guilds.cache.map((guild) => {
    return { name: guild.name, id: guild.id };
  });
  //console.log(servers);
  console.log(`${user.id} connected`);
  user.emit("setServers", servers);
});

httpServer.listen(7000);
