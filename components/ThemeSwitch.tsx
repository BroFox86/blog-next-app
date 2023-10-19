import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { App } from '~/services/app'
import { handleDarkTheme } from '~/utilities/handleDarkTheme'
import { saveState } from '~/utilities/sessionStorage'

import s from './ThemeSwitch.module.scss'

export const ThemeSwitch = observer(({ app }: { app: App }) => {
  const isThemeDark = app.darkTheme

  function handleClick() {
    handleDarkTheme(app, !isThemeDark)
    // Keep latest user-chosen theme in session storage to load it after page refreshing.
    saveState({ darkTheme: !isThemeDark })
  }

  return (
    // Prevent transition when page loads
    <>
      {isThemeDark !== null && (
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
      )}
    </>
  )
})
