import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { handleDarkTheme } from '~/hooks/useDarkTheme'
import { saveState } from '~/utilities/sessionStorage'

import s from './ThemeSwitch.module.scss'

export function ThemeSwitch() {
  const isThemeDark = useAppSelector(state => state.app.darkTheme)
  const dispatch = useAppDispatch()

  function handleClick() {
    handleDarkTheme(dispatch, isThemeDark ? false : true)
    saveState({ darkTheme: isThemeDark ? false : true })
  }

  return (
    <button
      className={clsx(s.component, isThemeDark && s.hasDarkTheme)}
      type='button'
      aria-label='Toggle night mode'
      onClick={handleClick}
    >
      <span className={s.moon}>🌛</span>
      <span className={s.slider} />
      <span className={s.sun}>🌞</span>
    </button>
  )
}
