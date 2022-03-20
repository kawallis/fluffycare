import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import * as lottieJson from "../../assets/95083-file-search.json";

const Calculating: NextPage = () => {
  const [isStopped, setIsStopped] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let timeout = setTimeout(() => {
      router.push("/get-a-quote/plans");
    }, 3000);
  }, [router]);

  return (
    <div>
      <Head>
        <title>FluffyCare | Step 8</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-48 flex items-end justify-center p-4 w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Alright. Let’s get you a quote! Calculating....
          </h1>
        </div>
        <div className="h-72 flex justify-center items-baseline md:items-center w-full md:w-1/2 lg:w-1/3">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 150, height: 150 }}
          />
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full"></div>
      </main>
    </div>
  );
};

export default Calculating;
