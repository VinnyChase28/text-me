import { twilioClient, twilioNumber } from "./twilioClient";

export async function welcomeText(phoneNumber: string, api: string) {
  const client = twilioClient;
  // await client.messages
  //   .create({
  //     from: twilioNumber,
  //     to: phoneNumber,
  //     body: `Thank you for using the ${api} API! you will receive a text message every day at the time you specified.`,
  //   })
  //   .then((message) => console.log(message.sid))
  //   .catch((e) => {
  //     console.error("Got an error:", e.code, e.message);
  //     return;
  //   });
  return console.log("Welcome message sent!");
}
