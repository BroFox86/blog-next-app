import s from './SearchPage.module.scss'

type Props = {
  query?: string
  children: React.ReactNode
}

export function SearchPage({ query, children }: Props) {
  return (
    <section className={s.container}>
      <h1 className={s.title}>Search results for {query}</h1>
      {children}
    </section>
  )
}
