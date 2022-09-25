import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import Banner from "../components/Banner";
import WeatherCard from "../components/WeatherCard";

const Weather: NextPage = () => {
  //this variable makes a req to the new-cron route with a payload
  const weather = trpc.useQuery([
    "weather.get-weather",
    { lat: 49.319981, lon: -123.072411 },
  ]);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;

  const [weatherData, setWeatherData] = useState<any>();

  useEffect(() => {
    setWeatherData(weather?.data?.response);
  }, [weather]);

  const sky = weatherData?.weather[0]?.description;
  const temp = weatherData?.main?.temp;
  const feelsLike = weatherData?.main?.feels_like;
  const minTemp = weatherData?.main?.temp_min;
  const maxTemp = weatherData?.main?.temp_max;
  const country = weatherData?.sys?.country;
  const name = weatherData?.name;

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col justify-center p-4">
        <Banner>
          {weather.data ? (
            <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-4">
              <WeatherCard>{`${name}, ${country}`}</WeatherCard>
              <WeatherCard>{sky}</WeatherCard>
              <WeatherCard>{`${temp}°C`}</WeatherCard>
              <WeatherCard>{`Feels like ${feelsLike}°C`}</WeatherCard>
              <WeatherCard>{`Low ${minTemp}°C`}</WeatherCard>
              <WeatherCard>{`High ${maxTemp}°C`}</WeatherCard>
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </Banner>

        <Form
          name="Weather"
          api="weather"
          api_id={1}
          description="Get weather reminders whenever you need them"
        />
      </main>
    </>
  );
};

export default Weather;
