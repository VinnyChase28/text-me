import React from "react";

//create button types
type ButtonProps = {
  className: string;
  processing: boolean;
  children: any;
  onClick: any;
};

const Button = ({
  className = "",
  processing,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={
        `inline-flex items-center px-8 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
          processing && "opacity-25"
        } ` + className
      }
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
