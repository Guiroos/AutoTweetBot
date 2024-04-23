const { SlashCommandBuilder } = require("discord.js");
const sendTweetImage = require("../../functions/sendTweetImage");

module.exports = {
  category: "twitter",
  data: new SlashCommandBuilder()
    .setName("tweetimage")
    .setDescription("Sends a tweet with an image and/or a message to a X page")
    .addStringOption((option) =>
      option
        .setName("uri")
        .setDescription("The image URI that you want to send.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("message").setDescription("The message you want to send.")
    ),
  async execute(interaction) {
    const imageURI = interaction.options.getString("uri", true).toLowerCase();

    const message = interaction.options.getString("message")?.toLowerCase();

    await interaction.deferReply();

    try {
      await sendTweetImage(imageURI, message);
      await interaction.editReply("meme irado meu parça!");
    } catch (error) {
      console.error("🚀 ~ error", error);
      await interaction.editReply("There was an error sending the tweet.");
    }
  },
};
