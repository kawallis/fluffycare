import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import NavigationBar from "../components/navigation/NavigationBar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../config/firebase";
import { QuoteProvider } from "../store/quote";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname == "/") {
      router.push("/get-a-quote/pet-name");
    }
  });

  return (
    <QuoteProvider>
      <>
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4">
          <Component {...pageProps} />
        </div>
        <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDt_ENG-d5jcPQwmsAqxL_J7rHnm8eY83o&libraries=places"></Script>
      </>
    </QuoteProvider>
  );
}

export default MyApp;
