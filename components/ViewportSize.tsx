'use client'

import { useEffect, useRef, useState } from 'react'

export function ViewportSize() {
  const [isMounted, setIsMounted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  function getValues() {
    const userAgent = window.navigator.userAgent
    const scrollbar = window.innerWidth - document.body.clientWidth
    let isScrollbarExcluded

    if (userAgent.search('Edg') === -1 && userAgent.search('Chrome') === -1 && userAgent.search('Firefox') === -1) {
      isScrollbarExcluded = true
    }

    const innerWidth = isScrollbarExcluded ? window.innerWidth - scrollbar : window.innerWidth

    return innerWidth + 'x' + window.innerHeight
  }

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    requestAnimationFrame(() => {
      setIsMounted(true)
    })

    const handleResize = () => {
      element.textContent = getValues()
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      style={{ position: 'fixed', zIndex: 9999, bottom: 0, left: '1%', background: 'white', color: 'blue' }}
      ref={elementRef}
    >
      {isMounted ? getValues() : null}
    </div>
  )
}
