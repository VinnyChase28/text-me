import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";
import { baseUrls } from "../../../utils/baseUrls";

export const deleteApiSettings = createRouter().mutation(
  "delete-api-settings",
  {
    input: z.object({
      api: z.string(),
      cronJobId: z.string(),
      phoneNumber: z.string(),
    }),
    async resolve({ input }) {
      const { data, error } = await supabase
        .from("phone_numbers")
        .select("weather, quotes");
      console.log(input);
      const cronJobId = input.cronJobId;
      const cronUrl = baseUrls.cronDelete + `${cronJobId}`;

      //await fetch the cronURl using next fetch and then chain into a console log of response

      const deleteCronJob = await fetch(cronUrl)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });

      const apiObject: any = { phone_number: input.phoneNumber };
      apiObject[input.api] = null;
      console.log(apiObject);
      const { data: supabaseData, error: supabaseError } = await supabase
        .from("phone_numbers")
        .upsert(apiObject)
        .select();

      //log supabase errors
      if (supabaseError) {
        console.log(supabaseError);
      }
      return {
        response: deleteCronJob,
      };
    },
  }
);
