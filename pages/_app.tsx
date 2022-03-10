import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavigationBar from "../components/navigation/NavigationBar";

function MyApp({ Component, pageProps }: AppProps) {
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
