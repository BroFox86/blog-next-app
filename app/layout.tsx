import '@/styles/normalize.css'
import '@/styles/global.scss'
import '@/styles/css-variables.scss'
import '@/styles/quill.css'

import clsx from 'clsx'
import { Metadata, Viewport } from 'next'
import { Inter, Roboto } from 'next/font/google'

import { themeScript } from '@/utils/theme'

import { MainLayout } from '../layout/MainLayout'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#5031aa'
}

const robotoFont = Roboto({
  variable: '--primary-font',
  weight: ['400', '500', '700'],
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
    'sans-serif'
  ]
})

const interFont = Inter({
  variable: '--heading-font',
  weight: ['600', '700', '800'],
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
    'sans-serif'
  ]
})

export const metadata: Metadata = {
  title: 'Home',
  description: ''
  // robots: 'noindex'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html className={clsx(robotoFont.variable, interFont.variable)} lang='en' suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: themeScript
            }}
          />
        </head>
        <MainLayout>{children}</MainLayout>
      </html>
    </>
  )
}
