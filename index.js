require("dotenv").config();
const { DISCORD_BOT_ID, CLIENT_ID, GUILD_ID } = process.env;

const { InitRest } = require("./src/rest.js");
const { client } = require("./src/client.js");

InitRest();
client.login(DISCORD_BOT_ID);
