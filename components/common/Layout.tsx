import { observer } from 'mobx-react-lite'

import { Header } from '~/components/header/Header'

import { Footer } from './Footer'
import s from './Layout.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = observer(({ children }: Props) => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
})
