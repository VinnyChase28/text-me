import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const weatherCronRouter: any = createRouter().mutation(
  "new-weather-cron",
  {
    input: z
      .object({
        name: z.string(),
        text: z.string(),
        timezone: z.string(),
        phone: z.string(),
        occurrence: z.string(),
        day: z.number(),
        time: z.string(),
        api_id: z.number(),
        api_name: z.string(),
        api_active: z.boolean(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .nullish(),
    async resolve({ input }) {

      //1. UPSERT data by api type and phone number
      const { data, error } = await supabase
        .from("phone_numbers")
        .upsert({ phone_number: input?.phone, weather: input })

      //2. if weather is already set, update the cron in supabase
      return input;
    },
  }
);
