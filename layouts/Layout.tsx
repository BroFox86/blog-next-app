import { Footer } from '~/components/footer/Footer'
import { Header } from '~/components/header/Header'
import { useDarkTheme } from '~/hooks/useDarkTheme'

import s from './Layout.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export function Layout(props: Props) {
  useDarkTheme()

  return (
    <div className={s.layout}>
      <Header />

      <main className={s.main}>{props.children}</main>

      <Footer />
    </div>
  )
}
