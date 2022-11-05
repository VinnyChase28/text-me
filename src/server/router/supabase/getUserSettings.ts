import { createRouter } from "../context";
import { baseUrls } from "../../../utils/baseUrls";
import { supabase } from "../../../utils/supabaseClient";

export const getUserSettings: any = createRouter().query("get-user-settings", {
  //this is the input provided by the client
  async resolve() {
    const user = supabase.auth.user();
    console.log(user);
    if (!user) {
      return {
        response: {
          errorMessage: "User not logged in",
          isError: true,
        },
      };
    }
    const { data, error } = await supabase.from("phone_numbers").select("*");
    return {
      response: data,
    };
  },
});
