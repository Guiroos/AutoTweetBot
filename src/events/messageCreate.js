const { Events } = require("discord.js");
const sendTweetImage = require("../functions/sendTweetImage");
const discordClient = require("../discordClient");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  category: "events",
  name: Events.MessageCreate,
  async execute(message) {
    const twitterChannel = process.env.DISCORD_TWITTER_CHANNEL;

    if (message.channelId === twitterChannel && !message.author.bot) {
      const messageContent = message?.content;
      const messageAttachments = message?.attachments;
      const firstAttachmentURI = messageAttachments
        ? messageAttachments.first()?.url
        : null;

      const imageURI = messageContent || firstAttachmentURI;

      try {
        await sendTweetImage(imageURI);

        await discordClient.channels.cache
          .get(twitterChannel)
          .send("meme irado meu parça!");
      } catch (error) {
        console.error("🚀 ~ error", error);

        await discordClient.channels.cache
          .get(twitterChannel)
          .send("There was an error sending the tweet.");
      }
    }
  },
};
