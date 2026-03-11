import { useEffect } from 'react'

/**
 * Trap focus within a DOM node.
 * @version 1.0.2
 */
export function useAccessibleModal(isMounted: boolean, ref: any, close: Function) {
  useEffect(() => {
    let lastActiveElement: any

    if (!isMounted) return

    // Save last focused element.
    lastActiveElement = document.activeElement

    function handleKeyDown(e: KeyboardEvent) {
      const focusElements = getFocusableElements()
      const firstFocusElement = focusElements[0]
      const lastFocusElement = focusElements[focusElements.length - 1]
      const isContains: boolean = ref.current.contains(e.target)

      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key !== 'Tab') return

      if (!isContains) {
        if (e.shiftKey) {
          lastFocusElement.focus()
          e.preventDefault()
          return
        }
        firstFocusElement.focus()
        e.preventDefault()
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusElement) {
          lastFocusElement.focus()
          e.preventDefault()
        }
        return
      }

      if (document.activeElement === lastFocusElement) {
        firstFocusElement.focus()
        e.preventDefault()
      }
    }

    function getFocusableElements(): HTMLElement[] {
      return ref.current.querySelectorAll(
        `a,
         button:not(:disabled),
         input:not(:disabled),
         textarea:not(:disabled),
         select:not(:disabled),
         [tabindex]:not([tabindex="-1"]):not(:disabled)`,
      )
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      lastActiveElement.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, ref])
}
