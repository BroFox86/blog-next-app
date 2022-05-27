import { App } from '~/services/app'

export function handleDarkTheme(app: App, isThemeDark: boolean) {
  const root = document.documentElement

  app.darkTheme = isThemeDark

  if (isThemeDark) {
    root.classList.add('hasDarkTheme')
  } else {
    root.classList.remove('hasDarkTheme')
  }
}
