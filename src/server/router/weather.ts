import { createRouter } from "./context";
import { z } from "zod";
import { supabase } from "../../utils/supabaseClient";
import { baseUrls } from "../../utils/baseUrls";

export const mainRouter = createRouter().query("new-cron", {
  //this is the input provided by the client
  input: z
    .object({
      text: z.string().nullish(),
      lat: z.number().nullish(),
      lon: z.number().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const lat = input?.lat;
    const lon = input?.lon;
    const data = await fetch(
      `${baseUrls.weather}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return {
      response: `Hello ${JSON.stringify(data) ?? "world"}`,
    };
  },
});
