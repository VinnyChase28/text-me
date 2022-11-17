import { twilioClient, twilioNumber } from "./twilioClient";

export async function welcomeText(
  phoneNumber: string,
  api: string,
  occurrence: string
) {
  const client = twilioClient;
  const messageDaily = `Hi! You have subscribed to the ${api} API. You will receive a text message every ${occurrence}.`;
  await client.messages
    .create({
      from: twilioNumber,
      to: phoneNumber,
      body: `Thank you for using the ${api} API! you will receive a text message every day at the time you specified. If you want to stop receiving messages, please send the word "stop" to this number.`,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
      return;
    });
  return console.log("Welcome message sent!");
}
