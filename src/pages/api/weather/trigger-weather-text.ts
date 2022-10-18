import type { NextApiRequest, NextApiResponse } from "next";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const client = twilioClient;
  client.messages
    .create({
      from: twilioNumber,
      to: "+12369995843",
      body: "You just sent an SMS from TypeScript using Twilio!",
    })
    .then((message) => console.log(message.sid));
  res.status(200).json(_req.body);
}
