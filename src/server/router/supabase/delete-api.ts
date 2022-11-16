import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const deleteApiSettings = createRouter().query("delete-api-settings", {
  input: z.object({
    api: z.string(),
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
