'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollManager({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])

  return <>{children}</>
}
