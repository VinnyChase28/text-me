import { useState, useRef, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

const Navbar = () => {
  const user = supabase.auth.user();
  const router = useRouter();

  //animation
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const reveal = () => setShow(!show);

  return (
    <>
      <nav
        ref={parent}
        className="flex items-center justify-between flex-wrap bg-purple-500 p-6 w-full"
      >
        <div className="md:flex flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight hover:cursor-pointer">
              Text Me Stuff
            </span>
          </Link>
        </div>
        <div className="md:hidden ml-auto">
          <button
            onClick={reveal}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white "
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full block flex-grow md:flex md:items-center md:w-auto">
          <div className="text-sm md:flex-grow">
            <Link href="/weather">
              <a className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4">
                Weather
              </a>
            </Link>
            <Link href="/quotes">
              <a className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4">
                Quotes
              </a>
            </Link>
            <Link href="/facts">
              <a className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4">
                Facts
              </a>
            </Link>
          </div>
          {user ? (
            <div>
              <Link href="/profile">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0">
                  Profile
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/auth">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0">
                  Sign In
                </a>
              </Link>
            </div>
          )}
        </div>
        {show && (
          <div className="md:hidden flex w-full h-screen text-center">
            <div className="text-5xl m-auto">
              <a
                onClick={() => {
                  setShow(false);
                  router.push("/weather");
                }}
                className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4 hover: cursor-pointer"
              >
                Weather
              </a>

              <a
                onClick={() => {
                  setShow(false);
                  router.push("/quotes");
                }}
                className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4 hover: cursor-pointer"
              >
                Quotes
              </a>
              <a
                onClick={() => {
                  setShow(false);
                  router.push("/facts");
                }}
                className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4 hover: cursor-pointer"
              >
                Facts
              </a>
              {user ? (
                <a
                  onClick={() => {
                    setShow(false);
                    router.push("/profile");
                  }}
                  className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4 hover: cursor-pointer"
                >
                  Profile
                </a>
              ) : (
                <a
                  onClick={() => {
                    setShow(false);
                    router.push("/auth");
                  }}
                  className="block mt-4 md:inline-block md:mt-0 text-white hover:text-white mr-4 hover: cursor-pointer"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
