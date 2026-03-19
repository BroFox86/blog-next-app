import s from './PostNotFound.module.scss'

export function PostNotFound() {
  return (
    <>
      <div className={s.root}>
        <h1 className={s.heading}>Oops! Page not found</h1>
        <h2 className={s.errorNumber}>404</h2>
        <p className={s.message}>
          I am sorry, but the page you requested
          <br /> was not found
        </p>
      </div>
    </>
  )
}
