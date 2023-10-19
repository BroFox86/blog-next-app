// Import global styles
import 'normalize.scss/normalize.scss'
import '~/styles/global.scss'
import '~/styles/css-variables.scss'
import '~/styles/quill.css'

import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { createMirageServer } from '~/mocks/server'
import { app } from '~/services/app'
import store from '~/services/store'
import { handleDarkTheme } from '~/utilities/handleDarkTheme'
import { loadState } from '~/utilities/sessionStorage'

// if (process.env.NODE_ENV === "development") {
createMirageServer({ environment: 'development' })
// }

export const robotoFont = Roboto({
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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Set the last choosed theme
    if (loadState()) {
      return handleDarkTheme(app, loadState().darkTheme)
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    // Set theme for the first time
    handleDarkTheme(app, mediaQueryList.matches)

    // Add a listener
    mediaQueryList.addEventListener('change', e => {
      handleDarkTheme(app, !!e.matches)
    })
  }, [])

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
