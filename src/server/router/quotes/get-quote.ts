import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";
import twilio from "twilio";
const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTHTOKEN;

export const quoteRouter: any = createRouter().query("get-quote", {
  //this is the input provided by the client
  async resolve() {
    const data = await fetch(`${baseUrls.quote}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });

    return {
      response: data,
    };
  },
});
