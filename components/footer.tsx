import s from './footer.module.scss'

export function Footer() {
  return (
    <footer className={s.outer}>
      <div className={s.inner}>
        Made by{' '}
        <a className={s.author} href='https://github.com/BroFox86' rel='noreferrer'>
          Daur Gamisonia
        </a>{' '}
        🦊
      </div>
    </footer>
  )
}
