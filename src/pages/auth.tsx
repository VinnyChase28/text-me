import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const VerifyOTP = (props: any) => {
  const [token, setToken] = useState("");
  const { push } = useRouter();
  const phone: any = props.phone;
  const [user, setUser] = useState();
  console.log(user);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.verifyOTP({
      phone,
      token,
      type: "sms",
    });

    if (!error) {
      const user = supabase.auth.user();
      setUser(user as any);
      push("/");
    } else {
      console.log(error);
    }
  };

  return (
    <div style={{ color: "black" }}>
      <h3>Verify OTP</h3>

      <p>Please verify your SMS with a code.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="token"
          placeholder="Your OTP code"
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

const Auth = () => {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    console.log(phone);
  }, [phone]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({ phone });
    if (!error) {
      setSubmitted(true);
    } else {
      console.log(error);
    }
  };

  //TODO: ensure phone number is in this format: +12369995843

  return (
    <div style={{ color: "black" }}>
      <h3>Ahoy!</h3>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">Lets go!</button>
        </form>
      ) : (
        <div>
          <VerifyOTP phone={phone ?? ""} />
        </div>
      )}
    </div>
  );
};

export default Auth;
