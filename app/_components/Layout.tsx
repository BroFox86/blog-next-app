import { Footer } from '@/app/_components/Footer'
import { Header } from '@/app/_components/Header'
import { ViewportSize } from '@/components/ViewportSize'

import s from './Layout.module.scss'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
      {process.env.NODE_ENV === 'development' && <ViewportSize />}
    </body>
  )
}
