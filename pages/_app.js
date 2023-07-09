import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import RootLayout from '../layouts/RootLayout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatePresence mode="wait">
        <Head>
          <title>FoxCut - Home</title>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4750405414089553"
            crossorigin="anonymous"
          ></script>
        </Head>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <Toaster position="bottom-center" reverseOrder={true} />
      </AnimatePresence>
    </>
  )
}
