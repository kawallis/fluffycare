import { NextPage } from "next";
import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { DashboardWrapper } from "../components/shared/DashboardWrapper";
import { useQuote } from "../store/quote";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import { Button } from "../components/shared/Button";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Policy: NextPage = () => {
  const router = useRouter();
  const [quote] = useQuote();

  const plans = [
    {
      id: 1,
      name: "Lucky's health policy",
      memory: "Gold",
      cpu: "March 4th 2022",
      storage: "Accident, Illness",
      price: "$40",
      isCurrent: false,
    },
    {
      id: 2,
      name: "Sprinkle's health policy",
      memory: "Silver",
      cpu: "March 22th 2022",
      storage: "Accident, Illness",
      price: "$80",
      isCurrent: true,
    },
    // More plans...
  ];

  return (
    <DashboardWrapper>
      <div className="px-4 sm:px-6 lg:px-8 pb-32">
        <div className="sm:flex sm:items-center mt-16 ">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Polices</h1>
            <p className="mt-2 text-base text-gray-700">
              Currently you have{" "}
              <strong className="font-semibold text-gray-900">0</strong>{" "}
              policies. Start a quote today and you'll be covered as early as
              tomorrow.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-16 mt-12 h-80 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <dt>
              <CurrencyDollarIcon
                className="mx-auto h-12 w-12 flex-shrink-0 text-gray-400 mb-4"
                aria-hidden="true"
              />
              <span className="mt-4 text-base font-medium text-gray-900">
                Get Pet Insurance Today
              </span>
            </dt>
            <dd className="mt-1 text-base text-gray-500 w-full md:w-1/2">
              Huge savings on tests, vaccines, and essential care for your pet
              and save $$ on your annual routine care with our preventative
              packages.
            </dd>
            <button
              type="button"
              onClick={() => {
                router.push("/get-a-quote/pet-name");
              }}
              className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Check our Prices
            </button>
          </div>
        </div>

        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Quotes</h1>
            <p className="mt-2 text-base text-gray-700">
              Your pet is currently on the{" "}
              <strong className="font-semibold text-gray-900">Silver</strong>{" "}
              plan. Below you can see your past quotes.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Start a new quote
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Your recent quotes
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Plan
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Coverage
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Price
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, planIdx) => (
                <tr key={plan.id}>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-transparent",
                      "relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {plan.name}
                      {plan.isCurrent ? (
                        <span className="text-blue-600">(Current Plan)</span>
                      ) : null}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>
                        {plan.memory} / {plan.cpu}
                      </span>
                      <span className="hidden sm:inline"> · </span>
                      <span>{plan.storage}</span>
                    </div>
                    {planIdx !== 0 ? (
                      <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                    ) : null}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {plan.memory}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {plan.cpu}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {plan.storage}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "px-3 py-3.5 text-sm text-gray-500"
                    )}
                  >
                    <div className="sm:hidden">{plan.price}/mo</div>
                    <div className="hidden sm:block">{plan.price}/month</div>
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-transparent",
                      "relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
                    )}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      disabled={plan.isCurrent}
                    >
                      Select<span className="sr-only">, {plan.name}</span>
                    </button>
                    {planIdx !== 0 ? (
                      <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Policy;
