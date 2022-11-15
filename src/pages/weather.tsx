import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import { trpc } from "../utils/trpc";
import { getPosition } from "../utils/getPosition";
import Head from "next/head";
import Form from "../components/Form";
import Banner from "../components/Banner";
import WeatherCard from "../components/WeatherCard";
import Link from "next/link";

const Weather: NextPage = () => {
  const user = supabase.auth.user();

  const [location, setLocation] = useState<any>({
    latitude: 0,
    longitude: 0,
  });

  type Query = {
    query: any;
  };

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

  //create type Group for useQuery

  const weather = trpc.useQuery(["weather.get-weather", { location } as any]);

  const [weatherData, setWeatherData] = useState<any>({
    sky: "",
    temp: "",
    feelsLike: "",
    minTemp: "",
    maxTemp: "",
    country: "",
    name: "",
  });

  useEffect(() => {
    if (weather?.data?.response) {
      setWeatherData({
        ...weatherData,
        sky: weather?.data?.response?.weather[0]?.description,
        temp: weather?.data?.response?.main?.temp,
        feelsLike: weather?.data?.response?.main?.feels_like,
        minTemp: weather?.data?.response?.main?.temp_min,
        maxTemp: weather?.data?.response?.main?.temp_max,
        country: weather?.data?.response?.sys?.country,
        name: weather?.data?.response?.name,
      });
    }
  }, [weather?.data?.response]);

  //create a new weather cron
  const newWeatherCron = trpc.useMutation(["weather.new-weather-cron"]);

  let isSuccess = false;
  const getData = async (formState: any) => {
    newWeatherCron.mutate(formState);
    isSuccess = newWeatherCron.isSuccess;
    console.log(newWeatherCron ?? null);
  };

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col justify-center p-4">
        <Banner>
          {weather ? (
            <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-4">
              <WeatherCard>{`${weatherData.name} ${weatherData.country}`}</WeatherCard>
              <WeatherCard>{weatherData.sky}</WeatherCard>
              <WeatherCard>{`${weatherData.temp}°C`}</WeatherCard>
              <WeatherCard>{`Feels like ${weatherData.feelsLike}°C`}</WeatherCard>
              <WeatherCard>{`Low ${weatherData.minTemp}°C`}</WeatherCard>
              <WeatherCard>{`High ${weatherData.maxTemp}°C`}</WeatherCard>
            </div>
          ) : (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Banner>
        {weather && user && !isSuccess ? (
          <Form
            name="Weather"
            api="weather"
            api_id={1}
            description="Get weather reminders whenever you need them"
            onSubmit={getData}
            disabled={newWeatherCron.isLoading}
          />
        ) : (
          <div>
            {!weather ? <p>Waiting for weather data...</p> : null}
            {!user ? (
              <p>
                Please{" "}
                <Link href="/auth">
                  <a className="underline">Sign In</a>
                </Link>{" "}
                to create a new text reminder
              </p>
            ) : null}
          </div>
        )}
      </main>
    </>
  );
};

export default Weather;
