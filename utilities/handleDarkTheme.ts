import { App } from '~/services/app'

export function handleDarkTheme(app: App, isThemeDark: boolean) {
  app.darkTheme = isThemeDark

  if (isThemeDark) {
    document.body.classList.add('hasDarkTheme')
  } else {
    document.body.classList.remove('hasDarkTheme')
  }
}
