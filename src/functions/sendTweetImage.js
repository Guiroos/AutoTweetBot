const downloadFile = require("./downloadFile");
const { twitterClient } = require("../twitterClient");
const deleteFile = require("./deleteFile");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendTweetImage = async (uri, message = "") => {
  try {
    const imageResponse = await downloadFile(uri);

    await sleep(2000);

    const mediaId = await twitterClient.v1.uploadMedia(
      imageResponse?.filePath,
      {
        mimeType: imageResponse?.mime,
      }
    );

    const twitterResponse = await twitterClient.v2.tweet({
      text: message,
      media: {
        media_ids: [mediaId],
      },
    });

    deleteFile(imageResponse?.filePath);

    return twitterResponse;
  } catch (error) {
    console.error("🚀 ~ sendTweetImage ~ error:", error);

    throw new Error("There was an error sending the tweet.");
  }
};

module.exports = sendTweetImage;
