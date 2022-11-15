import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

//this route will simply retreive weather data based on user location

export const weatherRouter = createRouter().query("get-weather", {
  input: z.object({
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  async resolve({ input }) {
    const lat = input?.location.latitude;
    const lon = input?.location.longitude;
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
