import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import RootLayout from "../layouts/RootLayout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence>
        <Head>
          <title>FoxCut - Home</title>
        </Head>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <Toaster position="bottom-center" reverseOrder={true} />
      </AnimatePresence>
    </>
  );
}
