import clsx from 'clsx'

import { useAppSelector } from '~/hooks/redux'

import s from './Footer.module.scss'

export function Footer() {
  const hasDarkTheme = useAppSelector(state => state.darkTheme)

  return (
    <footer className={clsx(s.outer, hasDarkTheme && s.hasDarkTheme)}>
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
