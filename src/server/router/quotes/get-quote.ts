import { createRouter } from "../context";
import { baseUrls } from "../../../utils/baseUrls";

export const quoteRouter = createRouter().query("get-quote", {
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
