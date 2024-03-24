import { openaiInstance } from '../apiKey/config.js';

export async function generateQuote() {
  try {
    const completion = await openaiInstance.chat.completions.create({
      messages: [
        { role: "user", content: "Write a motivational financial quote from a famous person." }
      ],
      model: "gpt-4-0125-preview",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Error generating quote from OpenAI: ' + error.message);
  }
}