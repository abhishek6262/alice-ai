import axios from "axios";

export function verify(mode, token, challenge) {
  const verificationToken = process.env.VERIFICATION_TOKEN;

  if (mode === "subscribe" && token === verificationToken) {
    console.log("WEBHOOK_VERIFIED");

    return {
      status: 200,
      data: challenge,
    };
  }

  return {
    status: 403,
  };
}

export function sendMessage(to, message) {
  return axios.post(
    `https://graph.facebook.com/v15.0/${process.env.BOT_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      text: {
        body: message,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}
