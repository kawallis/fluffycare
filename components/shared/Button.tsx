import React from "react";

export const Button = ({
  onClick,
  disabled = false,
  text,
}: {
  onClick: () => void;
  disabled?: boolean;
  text: string;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center w-full md:w-1/3 lg:w-1/4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        disabled ? "bg-gray-200 text-gray-500 hover:bg-gray-200" : ""
      }`}
    >
      {text}
    </button>
  );
};
