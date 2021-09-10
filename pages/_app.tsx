import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "~/store"
import Head from "next/head"

// Import global styles
import "normalize.scss/normalize.scss"
import "../styles/global.scss"
import "../styles/typography.scss"
import "../styles/variables.css"
import "../styles/quill.css"

import { makeServer } from "~/api/server"

// if (process.env.NODE_ENV === "development") {
makeServer({ environment: "development" })
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
