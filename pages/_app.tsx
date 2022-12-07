// Import global styles
import 'normalize.scss/normalize.scss'
import '~/styles/global.scss'
import '~/styles/css-variables.scss'
import '~/styles/quill.css'

import { Roboto } from '@next/font/google'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import { useDarkTheme } from '~/hooks/useDarkTheme'
import { createMirageServer } from '~/mocks/server'
import { app } from '~/services/app'
import store from '~/services/store'

const roboto = Roboto({
  variable: '--primary-font',
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
})

// if (process.env.NODE_ENV === "development") {
createMirageServer({ environment: 'development' })
// }

function MyApp({ Component, pageProps }: AppProps) {
  useDarkTheme(app)

  return (
    <Provider store={store}>
      <Head>
        <meta name='robots' content='noindex' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta name='theme-color' content='#5031aa' />
      </Head>
      <style jsx global>{`
        :root {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
