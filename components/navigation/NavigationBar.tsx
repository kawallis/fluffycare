import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusSmIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

import {
  RefreshIcon,
  QuestionMarkCircleIcon,
  InboxIcon,
  CogIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import StartOverModal from "../modals/StartOverModal";
import HaveAQuestionModal from "../modals/HaveAQuestionModal";
import { auth } from "../../config/firebase";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationBar() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const isAuthed = !!user;
  const hasPolicy = true;
  const isQuoteFlow = router.pathname.includes("get-a-quote");

  const [startUpModalOpen, setStartUpModalOpen] = useState(false);
  const [haveAQuestionModalOpen, setHaveQuestionModalOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    {isAuthed && (
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="font-sans font-extrabold text-xl">
                      FluffyCare
                    </h1>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <button
                      onClick={() => setHaveQuestionModalOpen(true)}
                      className="hover:cursor-pointer border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:text-gray-700"
                    >
                      <QuestionMarkCircleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Have a question
                    </button>
                    {isQuoteFlow && (
                      <button
                        onClick={() => setStartUpModalOpen(true)}
                        className="border-transparent text-gray-900 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        <RefreshIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Start Again
                      </button>
                    )}
                    <div className="hidden md:flex-shrink-0 md:flex md:items-center">
                      {/* Account dropdown */}
                      <Menu as="div" className="relative">
                        <div>
                          {isAuthed && (
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                              <a
                                href="#"
                                className="border-transparent text-gray-900  hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                              >
                                Account
                              </a>
                            </Menu.Button>
                          )}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Link href="/policy">
                              <Menu.Item>
                                {({ active }) => (
                                  <p
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                  >
                                    Your Policies
                                  </p>
                                )}
                              </Menu.Item>
                            </Link>
                            <Link href="/settings">
                              <Menu.Item>
                                {({ active }) => (
                                  <p
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                  >
                                    Settings
                                  </p>
                                )}
                              </Menu.Item>
                            </Link>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    signOut(auth);
                                    router.push("/login");
                                  }}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {!isAuthed && (
                    <button
                      onClick={() => setHaveQuestionModalOpen(true)}
                      className="block md:hidden border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xs md:text-sm font-medium hover:text-gray-700"
                    >
                      <QuestionMarkCircleIcon
                        className="mr-1 md:mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Have a question
                    </button>
                  )}
                  {isQuoteFlow && (
                    <button
                      onClick={() => setStartUpModalOpen(true)}
                      className="block md:hidden border-transparent text-gray-900 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs md:text-sm font-medium"
                    >
                      <RefreshIcon
                        className="mr-1 md:mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Start Again
                    </button>
                  )}
                  {/* {!isAuthed && (
                    <Link href="/login">
                      <p className="hover:cursor-pointer hidden md:block border-transparent text-gray-900  hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mr-6">
                        Already have an account?
                      </p>
                    </Link>
                  )} */}
                  {isAuthed && hasPolicy && (
                    <div className="ml-6 flex flex-row items-center">
                      <Link href="/what-is-a-claim">
                        <p className="cursor-pointer hidden md:block border-transparent text-gray-900  hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mr-6">
                          What is a Claim
                        </p>
                      </Link>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PlusSmIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          <span>File a Claim</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isAuthed && (
              <Disclosure.Panel className="md:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  >
                    <QuestionMarkCircleIcon
                      className="mr-2 h-5 w-5 inline-block"
                      aria-hidden="true"
                    />
                    Have a question
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/policy"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  >
                    <InboxIcon
                      className="mr-2 h-5 w-5 inline-block"
                      aria-hidden="true"
                    />
                    Your Policies
                  </Disclosure.Button>

                  <Disclosure.Button
                    as="a"
                    href="/settings"
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  >
                    <CogIcon
                      className="mr-2 h-5 w-5 inline-block"
                      aria-hidden="true"
                    />
                    Settings
                  </Disclosure.Button>
                  {hasPolicy && (
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      <DocumentAddIcon
                        className="mr-2 h-5 w-5 inline-block"
                        aria-hidden="true"
                      />
                      What is a Claim
                    </Disclosure.Button>
                  )}
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="border-transparent text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
      <StartOverModal open={startUpModalOpen} setOpen={setStartUpModalOpen} />
      <HaveAQuestionModal
        open={haveAQuestionModalOpen}
        setOpen={setHaveQuestionModalOpen}
      />
    </>
  );
}
