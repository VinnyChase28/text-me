import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { supabase } from "../utils/supabaseClient";
import Head from "next/head";
import Card from "../components/Card";

const Home: NextPage = () => {
  const user = supabase?.auth?.user();
  return (
    <>
      <Head>
        <title>Text Me Stuff</title>
        <meta name="description" content="Text Me Stuff App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-3">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Text <span className="text-purple-300">Me</span> Stuff
        </h1>
        <p className="text-2xl text-gray-700">
          {user ? "Welcome back! " : "Welcome! "}
          Text Me Stuff allows you to get useful text message reminders either
          daily or weekly on specified days of the week:
        </p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
          <Card
            name="Weather"
            description="Get weather reminders whenever you need them"
            link={"/weather"}
          />
          <Card
            name="Quotes"
            description="Need an afternoon pick-me-up? Get an inspirational quote sent to you"
            link={"/quotes"}
          />
        </div>
        <div className="grid gap-3 pt-3  text-center md:grid-cols-2 lg:w-2/3">
          <Card
            name="Facts"
            description="Get completely useless facts you can share with your friends and family"
            link={"/facts"}
          />
          <Card
            name="Facts"
            description="Get completely useless facts you can share with your friends"
            link={"/facts"}
          />
        </div>
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full"></div>
      </main>
    </>
  );
};

export default Home;
