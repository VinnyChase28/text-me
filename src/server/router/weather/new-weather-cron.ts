import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const weatherCronRouter: any = createRouter().query("new-weather-cron", {
  //this is the input provided by the client
  input: z
    .object({
      lat: z.number().nullish(),
      lon: z.number().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    //1. check to see if any crons exist in db for this user
    const { data: phoneData, error: phoneError } = await supabase
      .from("phone_numbers")
      .select("*")
      .eq("phone_number", "12369995843");

    return {
      response: phoneData,
    };
  },
});
