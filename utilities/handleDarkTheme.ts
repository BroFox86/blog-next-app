import { App } from '~/services/App'

export function handleDarkTheme(app: App, isThemeDark: boolean) {
  const root = document.documentElement

  app.switchTheme(isThemeDark)

  isThemeDark ? root.classList.add('hasDarkTheme') : root.classList.remove('hasDarkTheme')
}
