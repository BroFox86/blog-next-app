import { useEffect } from "react"

/**
 * Controls lock of the page scrolling through the <body> class name.
 * @param {string} lockClass - Target class name.
 * @param {boolean} isScrollLocked - Is scroll locked.
 */
export function useScrollLock(lockClass: string, isScrollLocked: boolean) {
  useEffect(() => {
    const body = document.body
    const header = body.querySelector("header")
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    function lockScrolling() {
      body.classList.add(lockClass)
      body.style.paddingRight = `${scrollbar}px`

      if (header) {
        header.style.paddingRight = `${scrollbar}px`
      }
    }

    function unlockScrolling() {
      body.classList.remove(lockClass)
      body.style.paddingRight = ""

      if (header) {
        header.style.paddingRight = ""
      }
    }

    if (isScrollLocked) {
      lockScrolling()
    } else {
      unlockScrolling()
    }

    return () => unlockScrolling()

  }, [lockClass, isScrollLocked])
}
