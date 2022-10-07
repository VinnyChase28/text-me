import { createRouter } from "../context";
import { z } from "zod";
import { supabase } from "../../../utils/supabaseClient";
import { baseUrls } from "../../../utils/baseUrls";

const easy_cron_token = process.env.NEXT_PUBLIC_EASY_CRON_KEY;
type ErrorMessage = {
  errorMessage: string;
  isError: boolean;
};

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
      const error: ErrorMessage = { errorMessage: "", isError: false };
      const cronExpression = "0 */5 * ? * *";
      const hour = input?.time;
      const day = input?.day;
      const timezone = input?.timezone;
      const body = JSON.stringify(input);

      // if (input?.occurrence == "daily") {
      //   cronExpression = `0 ${hour} * * *`;
      // } else if (input?.occurrence == "weekly") {
      //   cronExpression = `0 ${hour} * * ${day}`;
      // } else {
      //   error = {
      //     errorMessage: "occurrence is not valid",
      //     isError: true,
      //   };
      //   return {
      //     response: error,
      //   };
      // }

      error["isError"] = false;
      const cronEndpoint = `${baseUrls.cronAdd}?token=${easy_cron_token}&cron_expression=${cronExpression}&url=${baseUrls.newWeatherCron}&http_method=post&http_message_body=${body}&timezone_from=2&timezone=${timezone}&http_headers=Content-Type:application%2Fjson&cron_job_name=${input?.phone}`;

      const data = await fetch(`${cronEndpoint}`)
        .then((res) => {
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("data", data);
          return data;
        });

      const { data: supabaseData, error: supabaseError } = await supabase
        .from("phone_numbers")
        .upsert({
          phone_number: input?.phone,
          weather: { settings: input, cron_job_id: data?.cron_job_id },
        });

      return input;
    },
  }
);
