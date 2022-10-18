import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

//this route will simply retreive weather data based on user location

export const weatherRouter = createRouter().query("get-weather", {
  input: z
    .object({
      lat: z.number().nullish(),
      lon: z.number().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const lat = input?.lat;
    const lon = input?.lon;
    const data = await fetch(
      `${baseUrls.weather}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });

    return {
      response: data,
    };
  },
});
