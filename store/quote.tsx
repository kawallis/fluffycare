import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

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

const QuoteContext = React.createContext(
  {} as [QuoteInterface, Dispatch<SetStateAction<QuoteInterface>>]
);
const useQuote = (): [
  QuoteInterface,
  Dispatch<SetStateAction<QuoteInterface>>
] => useContext(QuoteContext);

const QuoteProvider: React.FC<Props> = ({ children }) => {
  const [quote, setQuote] = useState({
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
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("quote") || "{}")) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      setQuote({
        ...quote,
        ...JSON.parse(localStorage.getItem("quote") || "{}"),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quote", JSON.stringify(quote));
  }, [quote]);

  return (
    <QuoteContext.Provider value={[quote, setQuote]}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider, QuoteContext, useQuote };
