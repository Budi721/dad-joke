import type {AppProps} from 'next/app'
import Head from "next/head";
import '@/styles/globals.css'
import {AppBar} from "@/components/templates";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Dad Joke</title>
        <meta name="description" content="App to show dad random joke"/>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <AppBar/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
