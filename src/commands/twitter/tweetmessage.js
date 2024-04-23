const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "twitter",
  data: new SlashCommandBuilder()
    .setName("tweetmessage")
    .setDescription("Sends a tweet with a message to a X page")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to send.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options
      .getString("message", true)
      .toLowerCase();

    console.log("🚀 ~ execute ~ message:", message);

    await interaction.reply("Tweet sent to you!");
  },
};
