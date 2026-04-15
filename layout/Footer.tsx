'use client'

import s from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={s.root}>
      <div className={s.inner}>
        <a className={s.author} href='https://github.com/BroFox86' rel='noreferrer'>
          Daur Gamisonia
        </a>
        , {new Date().getFullYear()} 🦊
      </div>
    </footer>
  )
}
