const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTHTOKEN;

export const twilioClient = await("twilio")(accountSid, authToken, {
  lazyLoading: true,
});
