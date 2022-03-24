import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import InputBox from "../../components/form/InputBox";
import { Button } from "../../components/shared/Button";
import * as Yup from "yup";
import { useQuote } from "../../store/quote";
import { useRouter } from "next/router";
import { OnboardingWrapper } from "../../components/shared/OnboardingWrapper";

function useForm() {
  return useFormik({
    initialValues: {
      on: false,
    },
    validationSchema: Yup.object({
      on: Yup.boolean().required(),
    }),
    validateOnMount: true,
    async onSubmit() {
      alert("done");
    },
  });
}

const PetName: NextPage = () => {
  const [quote, setQuote] = useQuote();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: quote.pet_name,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required("Required"),
    }),
    onSubmit: async ({ name }) => {
      router.push("/get-a-quote/dog-or-cat");
      setQuote({
        ...quote,
        pet_name: name,
      });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <OnboardingWrapper>
      <Head>
        <title>FluffyCare | Step 1</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-48 flex justify-center items-end p-4 w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Hello! Can’t wait to meet your furry friend. What is their name?
          </h1>
        </div>
        <div className="h-72 flex justify-center items-baseline md:items-center w-full md:w-1/2 lg:w-1/3">
          <InputBox
            type="text"
            placeholder="Your Pet's Name"
            label=""
            name={formik.getFieldProps("name").name}
            value={formik.getFieldProps("name").value}
            onChange={formik.getFieldProps("name").onChange}
            onBlur={formik.getFieldProps("name").onBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full">
          <Button
            onClick={formik.submitForm}
            text="Continue"
            disabled={!formik.isValid}
          />
        </div>
      </main>
    </OnboardingWrapper>
  );
};

export default PetName;
