import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiInstance = new OpenAI(openaiApiKey);

async function main() {
  const textToReview = `
  `;

  const completion = await openaiInstance.chat.completions.create({
    messages: [
      { role: "system", content: "Please review and improve the following text, fixing any language and logic issues:" },
      { role: "user", content: textToReview }
    ],
    model: "gpt-4-0125-preview",
  });

  const responseText = completion.choices[0].message.content;

  // Save response to a text file
  fs.writeFileSync('reviewed_text.txt', responseText);

  console.log('Review completed and saved to "reviewed_text.txt"');
}

main();
