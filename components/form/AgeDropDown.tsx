import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const ages = [
  { id: 0, name: "Up to  1 year" },
  { id: 1, name: "1 year" },
  { id: 2, name: "2 years" },
  { id: 3, name: "3 years" },
  { id: 4, name: "4 years" },
  { id: 5, name: "5 years" },
  { id: 6, name: "6 years" },
  { id: 7, name: "7 years" },
  { id: 8, name: "8 years" },
  { id: 9, name: "9 years" },
  { id: 10, name: "10 years" },
  { id: 11, name: "11 years" },
  { id: 12, name: "12 years" },
  { id: 13, name: "13 years" },
  { id: 14, name: "14 years" },
  { id: 15, name: "15 years" },
  { id: 16, name: "16 years" },
  { id: 17, name: "17 years" },
  { id: 18, name: "18 years" },
  { id: 19, name: "19 years" },
  { id: 20, name: "20 years" },
  { id: 21, name: "21 years" },
  { id: 22, name: "22 years" },
  { id: 23, name: "23 years or more" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AgeDropDown() {
  const [selected, setSelected] = useState(ages[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate text-lg">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {ages.map((age) => (
                  <Listbox.Option
                    key={age.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={age}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {age.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
