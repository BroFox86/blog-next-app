import { observer } from 'mobx-react-lite'

import { Footer } from '~/components/footer/Footer'
import { Header } from '~/components/header/Header'
import { useDarkTheme } from '~/hooks/common'
import { App } from '~/services/app'

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
