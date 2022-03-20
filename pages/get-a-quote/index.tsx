import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function QuoteFlow({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    if (pathname == "/get-a-quote") {
      router.push("/get-a-quote/pet-name");
    }
  });

  return null;
}

export default QuoteFlow;
