import { twilioClient, twilioNumber } from "./twilioClient";

export async function welcomeText(
  phoneNumber: string,
  api: string,
  occurrence: string
) {
  const client = twilioClient;
  let message = "";
  //if occurrence is daily, create daily message otherwise create weekly message
  if (occurrence == "daily") {
    message = `Thank you for using the ${api} API! You will receive a ${api} quote every day at the time you specified`;
  } else if (occurrence == "weekly") {
    message = `Thank you for using the ${api} API! You will receive a a text once a week at the time you specified`;
  }

  await client.messages
    .create({
      from: twilioNumber,
      to: phoneNumber,
      body: message,
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.error("Got an error:", e.code, e.message);
      return;
    });
  return console.log("Welcome message sent!");
}
