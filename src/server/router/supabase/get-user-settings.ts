import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const getUserSettingsRouter = createRouter().query("get-user-settings", {
  input: z.object({
    phone: z.string(),
  }),
  async resolve({ input }) {
    //add the new api's to this query when they are ready
    const { data, error } = await supabase
      .from("phone_numbers")
      .select("weather, quotes");
    return {
      response: data,
    };
  },
});
