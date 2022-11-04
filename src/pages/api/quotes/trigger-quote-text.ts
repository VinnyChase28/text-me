import type { NextApiRequest, NextApiResponse } from "next";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";
import { baseUrls } from "../../../utils/baseUrls";

//all outside of client calls to the backend will go through traditional api routes
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = twilioClient;
  const data = await fetch(
    `${baseUrls.quote}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });

  console.log("BODY:",_req.body);
  const quoteText = `${data.response.quote}`;
  
  client.messages
    .create({
      from: twilioNumber,
      to: _req.body.phone,
      body: `${quoteText}`,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
    });

  console.log("After Twilio call");

  res.status(200).json(_req.body);
}
