import { NextPage } from "next";
import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Policy: NextPage = () => {
  return (
    <div>
      <div className="pb-5 my-12">
        <h1 className="ml-3 text-5xl font-bold leading-7 text-gray-900 sm:leading-9">
          My Policies
        </h1>
      </div>
      <div className="text-center">
        <h3 className="mt-2 text-lg font-medium text-gray-900">PET HEALTH</h3>
        <h4 className="text-sm font-medium text-gray-400 mb-4">
          From $10 / month
        </h4>
        <svg
          className="mx-auto h-12 w-12 text-gray-400 my-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>

        <p className="mt-1 text-md text-gray-500">
          Health Insurance for your pet with super fast everything
        </p>
        <Link href="/get-a-quote">
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Check Prices
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Policy;
