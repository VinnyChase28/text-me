import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";

//create type for props

type FullScreenMenuProps = {
  props: any;
};

const FullScreenMenu = (props): FullScreenMenuProps => {
  const [showModal, setShowModal] = useState(false);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => {
    setShowModal(!showModal);
    props.onChildClick();
  };
  return (
    <div ref={parent}>
      {!showModal && (
        <button
          onClick={reveal}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
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
      )}
      {showModal && (
        <div>
          <div className="">
            <div className="">
              {/*content*/}
              <div className="">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t text-white">
                  <h3 className="text-3xl font-semibold">Menu</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-white text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </div>
      )}
    </div>
  );
};

export default FullScreenMenu;
