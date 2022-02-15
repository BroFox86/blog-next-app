import { App } from '~/services/app'
import { saveState } from '~/utilities/sessionStorage'

export function handleDarkTheme(app: App, isThemeDark: boolean) {
  app.darkTheme = isThemeDark

  saveState({ darkTheme: isThemeDark })

  if (isThemeDark) {
    document.body.classList.add('hasDarkTheme')
  } else {
    document.body.classList.remove('hasDarkTheme')
  }
}
