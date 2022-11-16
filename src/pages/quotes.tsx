import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import Head from "next/head";
import Form from "../components/Form";
import Banner from "../components/Banner";
//import new quote cron

const Quotes: NextPage = () => {
  const user = supabase?.auth?.user();
  //this variable makes a req to the get-weather route with a payload
  const quoteData = trpc.useQuery(["quotes.get-quote"]);
  const [quote, setQuote] = useState({ saying: "", author: "" });
  const { saying } = quote;
  const { author } = quote;

  useEffect(() => {
    if (quoteData?.data?.response) {
      setQuote({
        saying: quoteData?.data?.response?.content,
        author: quoteData?.data?.response?.author,
      });
    }
  }, [quoteData?.data?.response]);

  //create a new weather cron
  const newQuoteCron = trpc.useMutation(["quotes.new-quote-cron"]);

  let isSuccess = false;
  const getData = async (formState: any) => {
    newQuoteCron.mutate(formState);
    isSuccess = newQuoteCron.isSuccess;
    console.log(newQuoteCron ?? null);
  };

  return (
    <>
      <Head>
        <title>Quotes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col justify-center p-4">
      <Banner title="Quotes">
          <figure className="mx-auto max-w-screen-md text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 dark:text-black">
                {saying}
              </p>
            </blockquote>
            <figcaption className="flex justify-center items-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://picsum.photos/200/300"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  {author}
                </cite>
              </div>
            </figcaption>
          </figure>
        </Banner>

        {quoteData && user ? (
          <Form
            name="Quotes"
            api="quotes"
            api_id={2}
            description="Get Quotes"
            onSubmit={getData}
            disabled={false}
          />
        ) : (
          <div>
            {!quoteData ? <p>Waiting for quotes data...</p> : null}
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

export default Quotes;
