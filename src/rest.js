const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const { DISCORD_BOT_ID, CLIENT_ID, GUILD_ID } = process.env;

module.exports = {
  InitRest,
};

const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_ID);

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

async function InitRest() {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
}
