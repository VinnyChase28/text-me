import type { NextApiRequest, NextApiResponse } from "next";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";
import { baseUrls } from "../../../utils/baseUrls";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = twilioClient;
  const data = await fetch(`${baseUrls.quote}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  const quoteText = data?.content;
  const author = data?.author;
  await client.messages
    .create({
      from: twilioNumber,
      to: _req.body.phone,
      body: `${quoteText}\n\n - ${author}`,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
    });

  console.log(quoteText);

  res.status(200).json(quoteText);
}
