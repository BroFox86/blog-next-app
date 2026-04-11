import { useEffect } from 'react'

/**
 * Hide on outside click.
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
