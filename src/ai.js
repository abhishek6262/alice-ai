import { Configuration, OpenAIApi } from "openai";
import { sendMessage } from "./whatsapp.js";

async function generateResponse(message) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAPI_SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Your name is Alice and you are a helpful female assistant.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  });

  return response.data.choices[0].message.content;
}

export async function respond(payload) {
  if (
    payload.changes &&
    payload.changes[0] &&
    payload.changes[0].value.messages &&
    payload.changes[0].value.messages[0]
  ) {
    const from = payload.changes[0].value.messages[0].from;
    const message = payload.changes[0].value.messages[0].text.body;
    const response = await generateResponse(message);

    try {
      await sendMessage(from, response);
    } catch (error) {
      console.error(error);
    }

    return {
      status: 200,
    };
  }
}
