const { twitterClient } = require("../twitterClient");

const sendTweetMessage = async (message) => {
  try {
    await twitterClient.v2.tweet(message);
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendTweetMessage;
