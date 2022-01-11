import s from './PageNotFound.module.scss'

export function PageNotFound() {
  return (
    <div className={s.error_404}>
      <h1 className={s.heading}>Oops! Page not found</h1>
      <h2 className={s.errorNumber}>404</h2>
      <p className={s.message}>
        We are sorry, but the page you requested
        <br /> was not found
      </p>
    </div>
  )
}
