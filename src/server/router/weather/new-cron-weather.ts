import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";
import { twilioClient } from "../../../utils/twilioClient";
import { trpc } from "../../../utils/trpc";
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTHTOKEN;

export const weatherCronRouter: any = createRouter().query("new-weather-cron", {
  //this is the input provided by the client
  input: z
    .object({
      lat: z.number().nullish(),
      lon: z.number().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    //call my other get weather route
    const weather = trpc.useQuery([
      "weather.get-weather",
      { lat: 49.319981, lon: -123.072411 },
    ]);

    const weatherData = weather?.data?.response;

    const sky = weatherData?.weather[0]?.description;
    const temp = weatherData?.main?.temp;
    const feelsLike = weatherData?.main?.feels_like;
    const minTemp = weatherData?.main?.temp_min;
    const maxTemp = weatherData?.main?.temp_max;
    const country = weatherData?.sys?.country;
    const name = weatherData?.name;

    console.log("weatherData", weatherData);

    twilioClient.messages
      .create({
        body: `${"text"}\n\n ${"description"}\n ${"temp"}°C"`,
        to: `${"2369995843"}`, // Text this number
        from: "+16043328356", // From a valid Twilio number
      })
      .then((message: any) => console.log(message.sid));
    return {
      response: weatherData,
    };
  },
});
