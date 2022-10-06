import { supabase } from "./supabaseClient";
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return false;
  } else {
    console.log("Signed out");
    return true;
  }
};
