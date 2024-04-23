const fs = require("node:fs");
const path = require("node:path");

function loadEvents(client) {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.rest) {
      if (event.once)
        client.rest.once(event.name, (...args) =>
          event.execute(...args, client)
        );
      else
        client.rest.on(event.name, (...args) => event.execute(...args, client));
    } else if (event.once)
      client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
  }
  return console.log("Loaded events");
}

module.exports = loadEvents;
