import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import moment from "moment";
import { getPosition } from "../utils/getPosition";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;

type FormProps = {
  name: string;
  api: string;
  description: string;
};

const Form = ({ name, api, description }: FormProps) => {
  const user = supabase.auth.user();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
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

  const [state, setState] = useState({
    text: "",
    city: "",
    timezone: timezone,
    phone: user?.phone ?? "",
    occurrence: "daily",
    day: 0,
    time: moment().format("HH"),
    api_id: 1,
    api_name: api,
    api_active: true,
    latitude: location?.latitude ?? "",
    longitude: location?.longitude ?? "",
  });
  console.log(state);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="w-full max-w-m">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            value={user?.phone}
            placeholder="+12345678910"
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
              console.log("daily clicked");
            }}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-1"
          >
            Daily
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("weekly clicked");
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
                <option value="0">00</option>
                <option value="30">15</option>
                <option value="30">30</option>
                <option value="30">45</option>
              </select>
              <select
                name="ampm"
                className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>
          <div className="mt-2 p-5 w-40 bg-white rounded-lg shadow-xl hover:cursor-pointer">
            <div className="flex">
              <select
                name="days"
                className="bg-transparent text-xl appearance-none outline-none hover:cursor-pointer"
              >
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
