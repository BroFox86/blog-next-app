import { useEffect } from 'react'

import { setDarkTheme } from '~/app/services/appSlice'
import { AppDispatch } from '~/app/store'
import { useAppDispatch } from '~/hooks/redux'
import { loadState } from '~/utilities/sessionStorage'

export function handleDarkTheme(dispatchFunc: AppDispatch, isThemeDark: boolean) {
  dispatchFunc(setDarkTheme(isThemeDark))

  if (isThemeDark) {
    document.body.classList.add('hasDarkTheme')
  } else {
    document.body.classList.remove('hasDarkTheme')
  }
}

export function useDarkTheme() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Set previous theme choosed by a user
    if (loadState() && 'darkTheme' in loadState()) {
      handleDarkTheme(dispatch, loadState().darkTheme)
      return
    }

    // Set theme for the first time
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      handleDarkTheme(dispatch, true)
    } else {
      handleDarkTheme(dispatch, false)
    }

    // Add a listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      handleDarkTheme(dispatch, e.matches ? true : false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
