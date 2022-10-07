import { useState, useRef, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

const Navbar = () => {
  const user = supabase.auth.user();

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
        <div className=" lg:flex  flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight hover:cursor-pointer">
              Text Me Stuff
            </span>
          </Link>
        </div>
        <div className="lg:hidden ml-auto">
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
        <div className="hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/weather">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Weather
              </a>
            </Link>
            <Link href="/quotes">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Quotes
              </a>
            </Link>
            <Link href="/facts">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Facts
              </a>
            </Link>
          </div>
          {user ? (
            <div>
              <Link href="/profile">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                  Profile
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/auth">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                  Sign In
                </a>
              </Link>
            </div>
          )}
        </div>
        {show && (
          <div className="w-full">
            <div className="text-xl columns-1 text-right">
              <Link href="/weather">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Weather
                </a>
              </Link>
              <Link href="/quotes">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Quotes
                </a>
              </Link>
              <Link href="/facts">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  Facts
                </a>
              </Link>
              {user ? (
                <Link href="/profile">
                  <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Profile
                  </a>
                </Link>
              ) : (
                <Link href="/auth">
                  <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Sign In
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
