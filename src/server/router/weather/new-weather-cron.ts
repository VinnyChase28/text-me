import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const weatherCronRouter: any = createRouter().mutation(
  "new-weather-cron",
  {
    //this is the input provided by the client
    input: z
      .object({
        lat: z.number().nullish(),
        lon: z.number().nullish(),
      })
      .nullish(),
    async resolve({ input }) {

      //1. check to see if any apis are active in db for this user. do it by name weather
      const { data: phoneData, error: phoneError } = await supabase
        .from("phone_numbers")
        .select("*")
        .eq("phone_number", "12369995843");

      //2. if weather is already set, update the cron in supabase
      
      

      return {
        response: phoneData,
      };
    },
  }
);
