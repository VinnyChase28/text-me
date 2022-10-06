import { useState } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import FullScreenMenu from "./FullScreenMenu";

const Navbar = () => {
  const user = supabase.auth.user();
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,0 80,120 -80,120" fill="#234236" />
            <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
            <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
            <rect x="-20" y="120" width="40" height="30" fill="brown" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            Text Me Stuff
          </span>
        </div>
        <div className="block lg:hidden">
          <FullScreenMenu />
        </div>
        <div className="hidden sm:visible md:visible w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              +{user?.phone}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
