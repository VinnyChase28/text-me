import type { NextApiRequest, NextApiResponse } from "next";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";
import { baseUrls } from "../../../utils/baseUrls";


const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = twilioClient;
  const lat = _req.body.latitude;
  const lon = _req.body.longitude;
  const data = await fetch(
    `${baseUrls.weather}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });

  const description = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const weatherText = `The weather is ${description} and the temperature is ${temp} degrees. It feels like ${feelsLike} degrees.`;
  await client.messages
    .create({
      from: twilioNumber,
      to: _req.body.phone,
      body: `${_req.body.text}\n\n${weatherText}`,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
    });

  console.log("After Twilio call");

  res.status(200).json(_req.body);
}
