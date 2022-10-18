import { createRouter } from "../context";
import { twilioClient, twilioNumber } from "../../../utils/twilioClient";
import { z } from "zod";
//This route will trigger a text with a body fron a scheduled cron job

export const weatherText: any = createRouter().mutation(
  "trigger-weather-text",
  {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      const client = twilioClient;
      console.log(input);
      client.messages
        .create({
          from: twilioNumber,
          to: "+12369995843",
          body: "You just sent an SMS from TypeScript using Twilio!",
        })
        .then((message) => console.log(message.sid));

      return {
        response: "Success! message sent.",
      };
    },
  }
);
