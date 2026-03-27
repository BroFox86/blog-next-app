'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { getThemeFromStorage } from '@/utils/theme'
import { setDarkTheme } from '@/utils/theme'
import { setThemeToStorage } from '@/utils/theme'

import s from './ThemeSwitch.module.scss'

export function ThemeSwitch() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = getThemeFromStorage()

    requestAnimationFrame(() => {
      setIsDarkTheme(savedTheme ? savedTheme.dark : mediaQuery.matches)
      setDarkTheme(savedTheme ? savedTheme.dark : mediaQuery.matches)

      setIsMounted(true)
    })

    function handleChangeTheme(e: MediaQueryListEvent) {
      if (getThemeFromStorage()) {
        return
      }

      setDarkTheme(!!e.matches)
      setIsDarkTheme(!!e.matches)
    }

    mediaQuery.addEventListener('change', handleChangeTheme)

    return () => mediaQuery.removeEventListener('change', handleChangeTheme)
  }, [])

  function handleClick() {
    setIsDarkTheme(!isDarkTheme)
    setDarkTheme(!isDarkTheme)
    // Keep latest user-chosen theme in session storage.
    setThemeToStorage({ dark: !isDarkTheme })
  }

  if (!isMounted) return

  return (
    <>
      <button
        className={clsx(s.root, isDarkTheme && s.hasDarkTheme)}
        type='button'
        aria-label='Toggle night mode'
        onClick={handleClick}
      >
        <span className={s.moon}>🌛</span>
        <span className={s.slider} />
        <span className={s.sun}>🌞</span>
      </button>
    </>
  )
}
