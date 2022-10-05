import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import Banner from "../components/Banner";

const Facts: NextPage = () => {
  //this variable makes a req to the get-weather route with a payload
  const factData = trpc.useQuery(["facts.get-fact"]);
  const [fact, setFact] = useState("");

  useEffect(() => {
    if (factData?.data?.response) {
      setFact(factData?.data?.response.text);
    }
    console.log(fact);
  }, [factData?.data?.response]);

  return (
    <>
      <Head>
        <title>Quotes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col justify-center p-4">
        <Banner>
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
                {fact}
              </p>
            </blockquote>
            <figcaption className="flex justify-center items-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://picsum.photos/200/300"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"></cite>
              </div>
            </figcaption>
          </figure>
        </Banner>

        <Form
          name="Weather"
          api="weather"
          api_id={3}
          description="Get totally useless facts you can share with your friends"
          data={{}}
        />
      </main>
    </>
  );
};

export default Facts;
