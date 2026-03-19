import { useEffect } from 'react'

export function useScrollLock(isLocked: boolean, className: string) {
  useEffect(() => {
    const body = document.body

    if (isLocked) {
      body.classList.add(className)
    } else {
      body.classList.remove(className)
    }

    return () => {
      body.classList.remove(className)
    }
  })
}
