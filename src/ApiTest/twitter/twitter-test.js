const Twitter = require('twitter');
const dotenv = require('dotenv');
dotenv.config();

const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const twitterClient = new Twitter(twitterConfig);

(async () => {
  try {
    const postTweet = await twitterClient.post('statuses/update', {
      status: "Testing Twitter API with a simple tweet!",
    });

    console.dir(postTweet, {
      depth: null,
    });
  } catch (error) {
    console.log('Error posting tweet:', error);
  }
})();
