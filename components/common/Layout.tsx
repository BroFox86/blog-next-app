import { Roboto } from '@next/font/google'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { Header } from '~/components/header/Header'

import { Footer } from './Footer'
import s from './Layout.module.scss'

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

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = observer(({ children }: Props) => {
  return (
    <div className={clsx(s.layout, roboto.variable)}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
})
