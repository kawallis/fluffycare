import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import InputBox from "../../components/form/InputBox";

const PetName: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FluffyCare | Step 1</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-48 flex justify-center items-end p-4 w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Ok last thing! Please tell us where to send your quote.
          </h1>
        </div>
        <div className="h-72 flex flex-col justify-center align-baseline w-full md:w-1/2 lg:w-1/3">
          <InputBox
            type="text"
            placeholder="Jerry Gergins"
            label=""
            icon="users"
          />
          <InputBox
            type="email"
            placeholder="bilbo@boggins.com"
            label=""
            icon="mail"
          />
          <div className="flex items-center mb-4 mt-6">
            <input
              id="policy-documents"
              name="policy-documents"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="policy-documents"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to recieve policy documents by email
            </label>
          </div>
          <div className="flex items-center jus">
            <input
              id="terms-and-conditions"
              name="terms-and-conditions"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms-and-conditions"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to the Terms and Conditions
            </label>
          </div>
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full">
          <Link href="/get-a-quote/calculating">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center justify-center w-full md:w-1/3 lg:w-1/4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PetName;
