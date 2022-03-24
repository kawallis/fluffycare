import { SearchIcon, CheckIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LocationSearchBox({
  address,
  setAddress,
  value,
  setValue,
  suggestions,
}: {
  address: string;
  setAddress: (val: string) => void;
  value: string;
  setValue: (val: string) => void;
  suggestions: any;
}) {
  return (
    <Combobox as="div" value={address} onChange={setAddress} className="w-full">
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Your home address
      </Combobox.Label>
      <div className="relative mt-1 w-full">
        <Combobox.Input
          className="w-full text-xl rounded-md border border-gray-300 bg-white py-5 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          onChange={(event) => setValue(event.target.value)}
          // @ts-ignore
          displayValue={(suggestion) => suggestion?.description || null}
          placeholder="435 BridgeView Drive, Kingston, WA"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {suggestions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {/* @ts-ignore */}
            {suggestions.map((suggestion) => (
              <Combobox.Option
                key={suggestion.place_id}
                value={suggestion}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {suggestion?.description}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          active ? "text-white" : "text-blue-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
