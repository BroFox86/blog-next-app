import { useEffect } from "react"

/**
 * Trap focus within a DOM node.
 */
export function useModal(isActive: boolean, ref: any, closeModal: Function) {
  useEffect(() => {
    let lastActiveElement: any
    let pressed: Set<string>

    if (!isActive) return

    // Save last focused element.
    lastActiveElement = document.activeElement

    pressed = new Set<string>()

    function handleFocusIn(e: FocusEvent) {
      const focusElements = getFocusableElements()
      const firstFocusElement = focusElements[0]
      const lastFocusElement = focusElements[focusElements.length - 1]
      const isContains: boolean = ref.current.contains(e.target)
      
      if (!isContains && e.relatedTarget === firstFocusElement) {
        return lastFocusElement.focus()
      }

      if (!isContains && e.relatedTarget === lastFocusElement) {
        return firstFocusElement.focus()
      }

      if (!isContains) {
        if (pressed.has("Shift")) {
          lastFocusElement.focus()
        } else {
          firstFocusElement.focus()
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal()
      } else {
        pressed.add(e.key)
      }
    }

    function getFocusableElements(): HTMLElement[] {
      return (ref.current.querySelectorAll(
        `a,
         button:not(:disabled),
         input:not(:disabled),
         textarea:not(:disabled),
         select:not(:disabled),
         *[tabindex]:not(:disabled)`
      ));
    }

    function clearPressed(e: KeyboardEvent) {
      pressed.delete(e.key)
    }

    document.addEventListener("focusin", handleFocusIn)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", clearPressed)

    return () => {
      document.removeEventListener("focusin", handleFocusIn)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", clearPressed)

      lastActiveElement.focus()
    }

  }, [isActive, ref, closeModal])
}
