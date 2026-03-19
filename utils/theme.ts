export function loadThemeFromStorage() {
  const serializedState = sessionStorage.getItem('theme')

  if (!serializedState) return

  return JSON.parse(serializedState)
}

export function saveThemeToStorage(state: object) {
  const serializedState = JSON.stringify(state)

  sessionStorage.setItem('theme', serializedState)
}

export function toggleThemeClassName(isDarkTheme: boolean) {
  const root = document.documentElement

  if (isDarkTheme) {
    root.classList.add('hasDarkTheme')
  } else {
    root.classList.remove('hasDarkTheme')
  }
}
