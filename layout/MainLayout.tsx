import { ViewportSize } from '@/components/ViewportSize'
import { Footer } from '@/layout/Footer'
import { Header } from '@/layout/Header'
import { AlertProvider } from '@/shared/AlertProvider'

import s from './MainLayout.module.scss'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={s.layout}>
      <Header />
      <AlertProvider>
        <main className={s.main}>{children}</main>
      </AlertProvider>
      <Footer />
      <div className={s.alerts} id='alert-portal' />
      {process.env.NODE_ENV === 'development' && <ViewportSize />}
    </body>
  )
}
