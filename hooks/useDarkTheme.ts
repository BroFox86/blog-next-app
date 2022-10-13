import { useEffect } from 'react'

import { App } from '~/services/app'
import { handleDarkTheme } from '~/utilities/handleDarkTheme'
import { loadState } from '~/utilities/sessionStorage'

export function useDarkTheme(app: App) {
  useEffect(() => {
    // Set the last choosed theme
    if (loadState()) {
      return handleDarkTheme(app, loadState().darkTheme)
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    // Set theme for the first time
    handleDarkTheme(app, mediaQueryList.matches)

    // Add a listener
    mediaQueryList.addEventListener('change', e => {
      handleDarkTheme(app, !!e.matches)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
