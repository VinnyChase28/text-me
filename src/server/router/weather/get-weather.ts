import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const weatherRouter = createRouter().query("get-weather", {
  //this is the input provided by the client
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
