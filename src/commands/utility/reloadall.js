const fs = require("node:fs");
const path = require("node:path");

const { SlashCommandBuilder } = require("discord.js");
const discordClient = require("../../discordClient");
const loadCommands = require("../../commandHandler");
const loadEvents = require("../../eventHandler");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("reloadall")
    .setDescription("Reloads.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type you want to reload.")
        .addChoices(
          { name: "commands", value: "commands" },
          { name: "events", value: "events" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const typeName = interaction.options.getString("type", true).toLowerCase();

    if (!typeName) {
      return interaction.reply(`There is no type with name \`${typeName}\`!`);
    }

    await interaction.deferReply();

    switch (typeName) {
      case "commands":
        loadCommands(discordClient);

        await interaction.editReply(
          `All \`${typeName}\` reloaded successfully.`
        );
        break;
      case "events":
        loadEvents(discordClient);

        await interaction.editReply(
          `All \`${typeName}\` reloaded successfully.`
        );
        break;
      default:
        return interaction.editReply(
          `There is no type with name \`${typeName}\`!`
        );
    }
  },
};
