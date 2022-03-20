import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getZipCode,
} from "use-places-autocomplete";
import { Button } from "../../components/shared/Button";
import * as Yup from "yup";

import LocationSearchBox from "../../components/form/LocationSearchBox";
import { useQuote } from "../../store/quote";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import InputBox from "../../components/form/InputBox";

const Address: NextPage = () => {
  const router = useRouter();
  const [quote, setQuote] = useQuote();

  const [address, setAddress] = useState("");
  const formik = useFormik({
    initialValues: {
      address2: "",
    },
    validationSchema: Yup.object({
      address2: Yup.string(),
    }),
    onSubmit: async ({ address2 }) => {},
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  const handleContinue = async () => {
    // @ts-ignore
    const res = await getGeocode({ address: address.description });
    // @ts-ignore
    const zip = await getZipCode(res[0]);
    // @ts-ignore
    let [streetNumber, street, city, state] = address.terms;

    setQuote({
      ...quote,
      mailing_address: {
        address1: streetNumber.value + " " + street.value,
        address2: formik.getFieldProps("address2").value,
        city: city.value,
        state: state.value,
        // @ts-ignore
        zip: zip,
      },
    });

    router.push("/get-a-quote/age");
  };

  return (
    <div>
      <Head>
        <title>FluffyCare | Step 3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-48 flex items-end justify-center p-4 w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Awesome! Where do ya’ll live?
          </h1>
        </div>
        <div className="h-72 flex justify-center items-baseline md:items-baseline w-full md:w-1/2 lg:w-1/3 flex-col">
          <LocationSearchBox
            value={value}
            setValue={setValue}
            address={address}
            setAddress={setAddress}
            suggestions={data}
          />
          <InputBox
            type="text"
            placeholder=""
            label="Apt / Unit # (Optional)"
            name={formik.getFieldProps("address2").name}
            value={formik.getFieldProps("address2").value}
            onChange={formik.getFieldProps("address2").onChange}
            onBlur={formik.getFieldProps("address2").onBlur}
            touched={formik.touched.address2}
            error={formik.errors.address2}
            containerClassName="mt-4 w-1/2"
          />
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full">
          <Button
            onClick={handleContinue}
            text="Continue"
            disabled={!address}
          />
        </div>
      </main>
    </div>
  );
};

export default Address;
