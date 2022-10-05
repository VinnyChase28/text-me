import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { trpc } from "../utils/trpc";
import moment from "moment";
import { getPosition } from "../utils/getPosition";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;

type FormProps = {
  name: string;
  api: string;
  description: string;
  api_id: number;
};

type Time = {
  hour: string;
  amOrPm: string;
};

const Form = ({ name, api, api_id, description }: FormProps) => {
  const user = supabase.auth.user();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  //get user's time inputs, make sure in 24 hour format
  const [time, setTime] = useState<Time>({ hour: "9", amOrPm: "AM" });
  const time12 = moment(`${time.hour} ${time.amOrPm}`, "h A").format("HH");
  const time24 = moment(time12, ["h A"]).format("HH");

  const [state, setState] = useState({
    text: "",
    city: "",
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

  // const sendUserData = () => {
  //   const response = trpc.useQuery(["weather.new-weather-cron", state]);
  //   //handle errors here
  //   return response;
  // };

  useEffect(() => {
    getPosition()
      .then((position: any) => {
        setLocation({
          ...location,
          latitude: position?.coords?.latitude.toString(),
          longitude: position?.coords?.longitude.toString(),
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

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w max-w-s">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="m-4">New Text</h1>
        <p>{description}</p>
        <br />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Phone Number
          </label>
          {!user?.phone ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              value={user?.phone}
              placeholder="+12345678910"
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
          ) : (
            <p>{user?.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Custom Message
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            value={state.text}
            placeholder="Enter a few words here"
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

          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>

          <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
            <div className="flex">
              <select
                name="hours"
                className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
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
      </form>
    </div>
  );
};

export default Form;
