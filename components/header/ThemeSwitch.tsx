import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { handleDarkTheme } from '~/hooks/useDarkTheme'
import { saveState } from '~/utilities/sessionStorage'

import s from './ThemeSwitch.module.scss'

export function ThemeSwitch() {
  const isStateThemeDark = useAppSelector(state => state.darkTheme)
  const [isThemeDark, setIsThemeDark] = useState<boolean>(isStateThemeDark)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsThemeDark(isStateThemeDark)
  }, [isStateThemeDark])

  function handleClick() {
    handleDarkTheme(dispatch, isThemeDark ? false : true)
    setIsThemeDark(isThemeDark ? false : true)
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
