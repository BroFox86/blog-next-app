import { useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'

type ModalLogicProps = {
  open: boolean
  setIsMounted: Dispatch<SetStateAction<boolean>>
  setIsVisible: Dispatch<SetStateAction<boolean>>
  initialFocusRef: React.Ref<HTMLElement | null>
}

export function useModalLogic({ open, setIsMounted, setIsVisible, initialFocusRef }: ModalLogicProps) {
  useEffect(() => {
    if (!open) {
      setIsVisible(false)

      return
    }

    setIsMounted(true)
    setInertAttrs(true)

    const active = document.activeElement

    if (initialFocusRef && 'current' in initialFocusRef && active instanceof HTMLElement) {
      initialFocusRef.current = active

      initialFocusRef.current.blur()
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })

    return () => {
      setInertAttrs(false)

      if (initialFocusRef && 'current' in initialFocusRef) {
        initialFocusRef.current?.focus()
      }
    }
  }, [open, setIsMounted, setIsVisible, initialFocusRef])
}

type TransitionEndProps = {
  e: React.TransitionEvent<HTMLDivElement>
  isVisible: boolean
  setIsMounted: Dispatch<SetStateAction<boolean>>
  initialFocusRef: React.Ref<HTMLElement | null>
}

export function handleTransitionEnd({ e, isVisible, setIsMounted, initialFocusRef }: TransitionEndProps) {
  if (isVisible || e.propertyName !== 'transform' || e.target !== e.currentTarget) {
    return
  }

  setIsMounted(false)
  setInertAttrs(false)

  if (initialFocusRef && 'current' in initialFocusRef) {
    initialFocusRef.current?.focus()
  }
}

function setInertAttrs(open: boolean) {
  const areas = document.querySelectorAll('body > header, body > main, body > footer')

  for (const area of areas) {
    if (open) {
      area.setAttribute('inert', 'inert')
      area.setAttribute('aria-hidden', 'true')
    } else {
      area.removeAttribute('inert')
      area.removeAttribute('aria-hidden')
    }
  }
}
