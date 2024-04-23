const { Collection } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const discordClient = require("./discordClient");

dotenv.config();
dotenv.config({ path: `.env.${process.env.APP_ENV}` });

const app = express();
const port = process.env.PORT || 4000;

discordClient.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      discordClient.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    discordClient.once(event.name, (...args) => event.execute(...args));
  } else {
    discordClient.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord with your client's token
discordClient.login(process.env.DISCORD_TOKEN);

// discordClient.login(process.env.DISCORD_TOKEN).then(() => {
//   app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`)
//   })
// })
