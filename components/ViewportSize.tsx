'use client'

import { useEffect, useRef } from 'react'

export function ViewportSize() {
  const elementRef = useRef<HTMLDivElement>(null)

  function getValues() {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent
      const scrollbar = window.innerWidth - document.body.clientWidth
      let isScrollbarExcluded

      if (userAgent.search('Edg') === -1 && userAgent.search('Chrome') === -1 && userAgent.search('Firefox') === -1) {
        isScrollbarExcluded = true
      }

      const innerWidth = isScrollbarExcluded ? window.innerWidth - scrollbar : window.innerWidth

      return innerWidth + 'x' + window.innerHeight
    } else {
      return ''
    }
  }

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    window.addEventListener('resize', () => {
      element.textContent = getValues()
    })
  }, [])

  return (
    <div
      style={{ position: 'fixed', zIndex: 9999, bottom: 0, left: '1%', background: 'white', color: 'blue' }}
      ref={elementRef}
      suppressHydrationWarning
    >
      {getValues()}
    </div>
  )
}
