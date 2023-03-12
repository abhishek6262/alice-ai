import { respond } from "../../src/ai.js";
import { verify } from "../../src/whatsapp.js";

async function createAi(request, response) {
  if (request.method === "GET") {
    const { status, data } = verify(
      request.query["hub.mode"],
      request.query["hub.verify_token"],
      request.query["hub.challenge"]
    );

    if (data) return response.status(status).send(data);

    return response.status(status);
  } else if (request.method === "POST" && request.body.entry) {
    const { status } = await respond(request.body.entry[0]);

    return response.status(status);
  }

  return response.status(404);
}

export default createAi;
