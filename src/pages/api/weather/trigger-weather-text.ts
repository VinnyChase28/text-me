import type { NextApiRequest, NextApiResponse } from "next";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";
import { baseUrls } from "../../../utils/baseUrls";
//all outside of client calls to the backend will go throughtraditional api routes
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
//TODO: call weather trpc route instead of redoing everything here
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = twilioClient;
  //make a request to get-weather.ts
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

  console.log("BODY:",_req.body);
  //create weather data variables
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const weatherText = `The weather is ${description} and the temperature is ${temp} degrees. It feels like ${feelsLike} degrees.`;


  client.messages
    .create({
      from: twilioNumber,
      to: _req.body.phone,
      body: `Hello ${_req.body.name}!\n\n${_req.body.text}\n\n${weatherText}`,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
    });

  console.log("After Twilio call");

  res.status(200).json(_req.body);
}
