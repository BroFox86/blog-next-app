import { observer } from 'mobx-react-lite'

import { Header } from '~/components/header/Header'
import { useDarkTheme } from '~/hooks/useDarkTheme'
import { App } from '~/services/app'

import { Footer } from './Footer'
import s from './Layout.module.scss'

type Props = {
  app: App
  children: JSX.Element | JSX.Element[]
}

export const Layout = observer(({ app, children }: Props) => {
  useDarkTheme(app)

  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
})
