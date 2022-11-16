import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { supabase } from "../utils/supabaseClient";
import { getPosition } from "../utils/getPosition";
import { signOut } from "../utils/signOut";
import ProfileCard from "../components/Cards/ProfileCard";

const Profile: NextPage = () => {
  const user = supabase.auth.user();
  const router = useRouter();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const phone: any = { phone: user.phone };
  const settingsData = trpc.useQuery(["supabase.get-user-settings", phone]);

  const [settings, setSettings] = useState<any>([]);
  const settingsContent: any = settings.map((setting: any, i: any) => {
    //create key and value variables
    const key = Object.keys(setting)[0];
    const value = setting[key];
    const occurrence = value?.settings?.occurrence;
    let time = value?.settings?.time;
    let timeString;
    //convert time 24hr to 12hr
    if (time > 12) {
      timeString = `${time - 12} PM`;
    } else if (time === 12) {
      timeString = `${time} PM`;
    } else if (time === 0) {
      timeString = `12 AM`;
    } else {
      if (time?.startsWith("0")) {
        time = time?.substring(1);
      }
      timeString = `${time} AM`;
    }

    const timezone = value?.settings?.timezone;
    return (
      <ProfileCard
        key={i}
        name={key}
        occurrence={occurrence}
        time={timeString}
        timezone={timezone}
      />
    );
  });

  useEffect(() => {
    if (settingsData) {
      const settingsArray: any = [];
      Object.entries(settingsData?.data?.response[0] ?? {}).forEach(
        ([key, value]) => {
          const obj: any = {};
          obj[key] = value;
          settingsArray.push(obj);
        }
      );
      setSettings(settingsArray);
    }
  }, [settingsData.data]);

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

  //tell me the type of RenderSettings

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-pink-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-purple-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative"></div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {`+${user?.phone}`}
                  </h3>
                  <button
                    className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                  >
                    Sign Out
                  </button>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        Welcome to your profile! below you will see all the text
                        message reminders you have set up.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Jump to reminders
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block" style={{ height: "500px" }}>
          <div className="container mx-auto px-4">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative"></div>
                </div>
              </div>

              <div className="mt-10 py-10  text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    {settingsData.isLoading
                      ? "Loading..."
                      : settingsData.isError
                      ? "Error!"
                      : settingsData.data
                      ? settingsContent
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
