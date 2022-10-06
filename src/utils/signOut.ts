import { supabase } from "./supabaseClient";
export const signOut = async () => {
  const {  error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return error;
  } else if (!error) {
    return true;
  }
};
