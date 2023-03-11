import { respond } from "../../src/ai.js";
import { verify } from "../../src/whatsapp.js";

function createAi(request, response) {
  if (request.method === "GET") {
    const { status, data } = verify(
      request.query["hub.mode"],
      request.query["hub.verify_token"],
      request.query["hub.challenge"]
    );

    if (data) response.send(data);

    return response.status(status);
  } else if (request.method === "POST" && request.body.entry) {
    const { status } = respond(request.body.entry[0]);

    return response.status(status);
  }

  return response.status(404);
}

export default createAi;
