import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { handleDarkTheme } from '~/hooks/common'
import { App } from '~/services/app'
import { saveState } from '~/utilities/sessionStorage'

import s from './ThemeSwitch.module.scss'

type Props = {
  app: App
}

export const ThemeSwitch = observer(({ app }: Props) => {
  const isStateThemeDark = app.darkTheme
  const [isThemeDark, setIsThemeDark] = useState<boolean>(isStateThemeDark)

  useEffect(() => {
    setIsThemeDark(isStateThemeDark)
  }, [isStateThemeDark])

  function handleClick() {
    handleDarkTheme(app, !isThemeDark)
    setIsThemeDark(!isThemeDark)
    saveState({ darkTheme: !isThemeDark })
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
})
