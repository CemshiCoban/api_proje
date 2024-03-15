const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiInstance = new OpenAI(openaiApiKey);

async function main() {
  const completion = await openaiInstance.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo-0613",
  });

  console.log(completion.choices[0]);
}

main();
