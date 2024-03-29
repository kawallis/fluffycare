import { useState } from "react";
import { SearchIcon, CheckIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { cats, dogs } from "../../data/breeds";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BreedSearchBox({
  dog_or_cat,
  selected,
  setSelected,
}: {
  dog_or_cat: string;
  selected: null | string;
  setSelected: ({ name: string }: any) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredDogs =
    query === ""
      ? dogs
      : dogs.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filteredCats =
    query === ""
      ? cats
      : cats.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filteredBreed = dog_or_cat === "dog" ? filteredDogs : filteredCats;

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      className="w-full"
    >
      <div className="relative mt-1 w-full">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-4 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(breed: string) => breed}
          placeholder={dog_or_cat === "dog" ? "Poodle" : "Alley Cat"}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredBreed.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredBreed.map((breed) => (
              <Combobox.Option
                key={breed.id}
                value={breed}
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
                      {breed.name}
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
