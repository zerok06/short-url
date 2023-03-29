import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence>
        <Head>
          <title>Foxify - Home</title>
        </Head>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={true} />
      </AnimatePresence>
    </>
  );
}
