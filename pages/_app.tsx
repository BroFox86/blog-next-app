// Import global styles
import 'normalize.scss/normalize.scss'
import '~/styles/global.scss'
import '~/styles/css-variables.scss'
import '~/styles/quill.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { createMirageServer } from '~/mocks/server'
import store from '~/services/store'

// if (process.env.NODE_ENV === "development") {
createMirageServer({ environment: 'development' })
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name='robots' content='noindex' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta name='theme-color' content='#5031aa' />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
