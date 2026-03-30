export const themeScript = `
  (() => {
    const hasLocalTheme = JSON.parse(sessionStorage.getItem('theme'));
    const hasMediaDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (hasLocalTheme && hasLocalTheme.dark) {
      document.documentElement.classList.add('hasDarkTheme');

      return;
    }

    if (hasLocalTheme) {
      return;
    }

    if (hasMediaDarkTheme) {
      document.documentElement.classList.add('hasDarkTheme');
    }
  })()
`

export function getThemeFromStorage() {
  const serializedState = sessionStorage.getItem('theme')

  if (!serializedState) return

  return JSON.parse(serializedState)
}

export function setThemeToStorage(state: object) {
  const serializedState = JSON.stringify(state)

  sessionStorage.setItem('theme', serializedState)
}

export function setDarkTheme(isDarkTheme: boolean) {
  const root = document.documentElement

  if (isDarkTheme) {
    root.classList.add('hasDarkTheme')
  } else {
    root.classList.remove('hasDarkTheme')
  }
}

export function checkDarkTheme() {
  const root = document.documentElement

  if (root.classList.contains('hasDarkTheme')) {
    return true
  } else {
    return false
  }
}
