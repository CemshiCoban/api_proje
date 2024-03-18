import Twitter from 'twitter';
import dotenv from 'dotenv';
dotenv.config();

// Twitter API credentials
const twitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

// Create a new Twitter client
const twitterClient = new Twitter(twitterConfig);

// Function to post a tweet
async function postTweet(text) {
  try {
    // Make a POST request to the Twitter API to create a tweet
    const tweet = await twitterClient.post('statuses/update', {
      status: text
    });

    console.log('Tweet posted successfully:', tweet);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

// Call the postTweet function with the tweet text
postTweet("Hello world! This is my first tweet using the Twitter API.");
