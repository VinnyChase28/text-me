import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

//this route will simply retreive weather data based on user location

export const getUserSettingsRouter: any = createRouter().query(
  "get-user-settings",
  {
    input: z.object({
      phone: z.string(),
    }),
    async resolve({ input }) {
      const { data, error } = await supabase.from("phone_numbers").select("*");
      console.log(data);
      return {
        response: data,
      };
    },
  }
);
