import { useState, useRef, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { trpc } from "../utils/trpc";
import { getPosition } from "../utils/getPosition";
import Link from "next/link";
import moment from "moment";
import autoAnimate from "@formkit/auto-animate";
import Button from "../components/Button";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;

type FormProps = {
  name: string;
  api: string;
  description: string;
  api_id: number;
  onSubmit?: any;
  disabled: boolean;
};

type Time = {
  hour: string;
  amOrPm: string;
};

const Form = ({
  name,
  api,
  api_id,
  description,
  onSubmit,
  disabled,
}: FormProps) => {
  //get user and location
  const user = supabase.auth.user();

  //if we have a user, call getUserSettings
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const [weatherData, setWeatherData] = useState<any>({
    sky: "",
    temp: "",
    feelsLike: "",
    minTemp: "",
    maxTemp: "",
    country: "",
    name: "",
  });

  //open and close form animation
  const [form, showForm] = useState(false);
  const reveal = () => {
    if (!user) {
      alert("Please login first");
    } else {
      showForm(!form);
    }
  };
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  //get user's time inputs, make sure in 24 hour format
  const [time, setTime] = useState<Time>({ hour: "9", amOrPm: "AM" });
  const time12 = moment(`${time.hour} ${time.amOrPm}`, "h A").format("HH");
  const time24 = moment(time12, ["h A"]).format("HH");

  //set form state
  const [state, setState] = useState({
    name: "",
    text: "",
    timezone: timezone,
    phone: user?.phone ?? "",
    occurrence: "daily",
    day: 0,
    time: time24,
    api_id: api_id,
    api_name: api,
    api_active: true,
    latitude: location?.latitude,
    longitude: location?.longitude,
  });

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const phone: any = { phone: user.phone };
  const settingsData = trpc.useQuery(["supabase.get-user-settings", phone]);

  useEffect(() => {
    const response = settingsData?.data?.response || [];
    for (const key in response[0]) {
      if (key === api) {
        if (response[0][`${api}`]?.settings?.api_active === true) {
          console.log("api enabled");
          setProcessing(true);
        }
      }
    }
  }, [settingsData]);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    getPosition()
      .then((position: any) => {
        setLocation({
          ...location,
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      latitude: location?.latitude,
      longitude: location?.longitude,
    });
  }, [location]);

  useEffect(() => {
    setState({ ...state, time: time24 });
  }, [time]);

  const handleSubmit = async (e: any, state: any) => {
    setProcessing(true);
    e.preventDefault();
    const result = await onSubmit(state);
    if (result?.isLoading) {
      setProcessing(true);
    } else if (result?.status === "success") {
      setProcessing(true);
    } else if (result?.isError) {
      setProcessing(false);
    }
  };

  // async await is up to you
  return (
    <div className="max-w-s flex-col" ref={parent}>
      {processing && (
        <p>
          You already have a text reminder for this API. Visit your{" "}
          <Link href="/profile">
            <a className="underline">Profile</a>
          </Link>{" "}
          to manage it.
        </p>
      )}
      <br />
      <button
        //center the button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={reveal}
      >
        New Text
      </button>

      {user && form && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-12">
          <p>{description}</p>
          <br />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Phone Number
            </label>
            <p>{user?.phone}</p>
          </div>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Custom Message - will appear at the top
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              value={state.text}
              placeholder="Optional message"
              onChange={(e) => setState({ ...state, text: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Occurrence
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, occurrence: "daily" });
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1"
            >
              Daily
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, occurrence: "weekly" });
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Weekly
            </button>

            <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
              <div className="flex">
                <select
                  name="hours"
                  className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
                  defaultValue="9"
                  onChange={(e) => {
                    setTime({ ...time, hour: e.target.value });
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">10</option>
                  <option value="12">12</option>
                </select>
                <span className="text-xl mr-3">:</span>
                <select
                  name="minutes"
                  className="bg-transparent text-xl appearance-none outline-none mr-4 hover:cursor-pointer"
                >
                  {/* TODO: add quarter hour increments later */}
                  {/* <option value="0">00</option>
                <option value="30">15</option>
                <option value="30">30</option>
                <option value="30">45</option> */}
                </select>
                <select
                  name="ampm"
                  className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
                  onChange={(e) => {
                    setTime({ ...time, amOrPm: e.target.value });
                  }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            {state.occurrence === "weekly" ? (
              <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
                <div className="flex">
                  <select
                    name="days"
                    onChange={(e) => {
                      setState({ ...state, day: parseInt(e.target.value) });
                    }}
                    className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
                  >
                    <option value={0}>Monday</option>
                    <option value={1}>Tuesday</option>
                    <option value={2}>Wednesday</option>
                    <option value={3}>Thursday</option>
                    <option value={4}>Friday</option>
                    <option value={5}>Saturday</option>
                    <option value={6}>Sunday</option>
                  </select>
                </div>
              </div>
            ) : null}
          </div>
          <Button
            processing={processing}
            className="bg-purple-600"
            onClick={(e: any) => {
              handleSubmit(e, state);
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default Form;
