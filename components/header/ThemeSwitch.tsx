import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { App } from '~/services/app'
import { handleDarkTheme } from '~/utilities/handleDarkTheme'

import s from './ThemeSwitch.module.scss'

type Props = {
  app: App
}

export const ThemeSwitch = observer(({ app }: Props) => {
  const isThemeDark = app.darkTheme

  function handleClick() {
    handleDarkTheme(app, !isThemeDark)
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
