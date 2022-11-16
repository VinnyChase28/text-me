import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";

export const deleteApiSettings = createRouter().query("delete-api-settings", {
  input: z.object({
    api: z.string(),
  }),
  async resolve({ input }) {
    //upsert to clear the api settings
    const { data, error } = await supabase
      .from("countries")
      .upsert({ id: 1, name: "Albania" })
      .select();

    return {
      response: data,
    };
  },
});
