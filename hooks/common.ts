import { useEffect } from 'react'

import { App } from '~/app/services/app'
import { loadState } from '~/utilities/sessionStorage'

export function handleDarkTheme(app: App, isThemeDark: boolean) {
  app.darkTheme = isThemeDark

  if (isThemeDark) {
    document.body.classList.add('hasDarkTheme')
  } else {
    document.body.classList.remove('hasDarkTheme')
  }
}

export function useDarkTheme(app: App) {
  useEffect(() => {
    // Set previous theme choosed by a user
    if (loadState() && 'darkTheme' in loadState()) {
      handleDarkTheme(app, loadState().darkTheme)
      return
    }

    // Set theme for the first time
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      handleDarkTheme(app, true)
    } else {
      handleDarkTheme(app, false)
    }

    // Add a listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      handleDarkTheme(app, e.matches ? true : false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
