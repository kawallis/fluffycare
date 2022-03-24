import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import * as lottieJson from "../../assets/83726-season-fireworks.json";
import { useQuote } from "../../store/quote";
import { OnboardingWrapper } from "../../components/shared/OnboardingWrapper";

const Congratulations: NextPage = () => {
  const [quote, setQuote] = useQuote();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/policy");
  };

  return (
    <OnboardingWrapper>
      <Head>
        <title>FluffyCare | Success</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center flex-col max-h-full">
        <div className="h-32 flex items-center justify-center p-4 w-full lg:w-3/4 flex-col">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 150, height: 150 }}
          />
        </div>
        <div className="h-72 flex justify-center items-baseline md:items-center w-full md:w-1/2 lg:w-1/2 flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Congratulations! {quote.pet_name} is now covered!{" "}
          </h1>
          <p className="text-center text-gray-700">
            Your payment was successfully processed and {quote.pet_name}’s
            coverage will begin after midnight today. Go to your account to view
            your new policy and explore!
          </p>
        </div>

        <div className="h-32 flex justify-center items-end md:items-center py-6 w-full">
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center w-full md:w-1/3 lg:w-1/4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Account
          </button>
        </div>
      </main>
    </OnboardingWrapper>
  );
};

export default Congratulations;
