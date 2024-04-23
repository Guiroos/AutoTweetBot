const fs = require("node:fs");
const path = require("node:path");

async function loadCommands(client) {
  let commandsArray = [];

  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`./commands/${folder}/${file}`);

      const properties = { folder, ...commandFile };
      client.commands.set(commandFile.data.name, properties);

      commandsArray.push(commandFile.data.toJSON());
    }
  }

  client.application.commands.set(commandsArray);

  return console.log(" Loaded Commands");
}

module.exports = loadCommands;
