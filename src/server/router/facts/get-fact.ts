import { createRouter } from "../context";
import { z } from "zod";
import { baseUrls } from "../../../utils/baseUrls";

export const factRouter: any = createRouter().query("get-fact", {
  //this is the input provided by the client
  async resolve() {
    const data = await fetch(`${baseUrls.uselessFacts}`)
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
