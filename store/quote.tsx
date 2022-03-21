import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";

type Props = {};

interface QuoteInterface {
  pet_name: string;
  dog_or_cat: string;
  mailing_address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  pet_age: string;
  pet_sex: string;
  breed: string;
}

export const INITIAL = {
  pet_name: "",
  dog_or_cat: "",
  mailing_address: {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  },
  pet_age: "",
  pet_sex: "",
  breed: "",
};

const QuoteContext = React.createContext(
  {} as [QuoteInterface, Dispatch<SetStateAction<QuoteInterface>>]
);
const useQuote = (): [
  QuoteInterface,
  Dispatch<SetStateAction<QuoteInterface>>
] => useContext(QuoteContext);

const QuoteProvider: React.FC<Props> = ({ children }) => {
  const [quote, setQuote] = useLocalStorageState("quote", {
    ssr: true,
    defaultValue: INITIAL,
  });

  return (
    <QuoteContext.Provider value={[quote, setQuote]}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider, QuoteContext, useQuote };
