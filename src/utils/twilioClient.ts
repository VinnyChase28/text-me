import { Twilio } from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID ?? "";
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTHTOKEN ?? "";
export const twilioNumber = process.env.NEXT_PUBLIC_TWILIO_NUMBER;
export const twilioClient = new Twilio(accountSid, authToken);
