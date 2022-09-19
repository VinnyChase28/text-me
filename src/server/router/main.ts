import { createRouter } from "./context";
import { z } from "zod";
import { supabase } from "../../utils/supabaseClient";
import { baseUrls } from "../../utils/baseUrls";

let weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

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
    console.log(input);
    let lat = input?.lat;
    let lon = input?.lon;
    let data = await fetch(
      `${baseUrls.weather}?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    console.log(data);
    return {
      greeting: `Hello ${JSON.stringify(data) ?? "world"}`,
    };
  },
});
