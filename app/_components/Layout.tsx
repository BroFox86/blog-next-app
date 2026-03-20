import { Footer } from '@/app/_components/Footer'
import { Header } from '@/app/_components/Header'
import { ViewportSize } from '@/components/ViewportSize'

import { AlertProvider } from './AlertProvider'
import s from './Layout.module.scss'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className={s.layout}>
      <Header />
      <AlertProvider>
        <main className={s.main}>{children}</main>
      </AlertProvider>
      <Footer />
      {process.env.NODE_ENV === 'development' && <ViewportSize />}
    </body>
  )
}
