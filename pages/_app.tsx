import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavigationBar from "../components/navigation/NavigationBar";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname == "/") {
      router.push("/get-a-quote/pet-name");
    }
  });

  return (
    <>
      <NavigationBar />
      <div className="max-w-7xl mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
