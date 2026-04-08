import { useEffect } from 'react'

/**
 * Hide the element when the user clicks outside of its markup.
 */
export function useOutsideClicks(selector: string, handleVisibility: (isVisible: boolean) => void) {
  useEffect(() => {
    function listenClicks(e: MouseEvent) {
      const target = e.target

      if (!(target instanceof Element) || target.closest(selector)) {
        return
      }

      handleVisibility(false)
    }

    document.body.addEventListener('click', listenClicks)

    return () => {
      document.body.removeEventListener('click', listenClicks)
    }
  }, [selector, handleVisibility])
}
