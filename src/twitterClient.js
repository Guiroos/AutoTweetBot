const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TT_API_KEY,
  appSecret: process.env.TT_API_SECRET,
  accessToken: process.env.TT_ACCESS_TOKEN,
  accessSecret: process.env.TT_ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.TT_BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer };
