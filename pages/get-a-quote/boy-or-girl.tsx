import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import InputBox from "../../components/form/InputBox";

const plans = [
  {
    id: "male",
    name: "Boy",
  },
  {
    id: "female",
    name: "Girl",
  },
];

const BoyOrGirl: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FluffyCare | Step 5</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-48 flex items-end justify-center p-4 w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Perfect! Is Sprinkles a boy or a girl?{" "}
          </h1>
        </div>
        <div className="h-72 flex justify-center items-center w-full md:w-1/2 lg:w-1/3">
          <fieldset>
            <legend className="sr-only">Sex</legend>
            <div className="space-y-5">
              {plans.map((plan) => (
                <div key={plan.id} className="relative flex items-center mb-12">
                  <div className="flex items-center h-5">
                    <input
                      id={plan.id}
                      aria-describedby={`${plan.id}-description`}
                      name="plan"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-2xl">
                    <label
                      htmlFor={plan.id}
                      className="font-medium text-gray-700"
                    >
                      {plan.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>{" "}
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full">
          <Link href="/get-a-quote/breed">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center justify-center w-full md:w-1/3 lg:w-1/4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BoyOrGirl;
