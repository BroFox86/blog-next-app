import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { robotoFont } from '~/pages/_app'

import { Footer } from './Footer'
import { Header } from './Header'
import s from './Layout.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = observer(({ children }: Props) => {
  return (
    <div className={clsx(s.layout, robotoFont.variable)}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
})
