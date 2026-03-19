'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Alert } from '@/components/Alert'

export function AlertBox() {
  const [alerts, setAlert] = useState<React.ReactNode>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const message = searchParams.get('message') || ''

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (status !== 'success-add' && status !== 'success-update' && status !== 'success-delete' && status !== 'error') {
      return
    }

    if (status === 'success-add') {
      requestAnimationFrame(() => {
        setAlert(createAddPostAlert(message))
      })
    }

    if (status === 'success-update') {
      requestAnimationFrame(() => {
        setAlert(createUpdatePostAlert(message))
      })
    }

    if (status === 'success-delete') {
      requestAnimationFrame(() => {
        setAlert(createDeletePostAlert(message))
      })
    }

    if (status === 'error') {
      requestAnimationFrame(() => {
        setAlert(createErrorAlert(message))
      })
    }

    params.delete('status')
    params.delete('message')
    router.replace(`${pathname}?${params}`, { scroll: false })
  }, [router, pathname, searchParams, status, message])

  return <div>{alerts}</div>
}

function createAddPostAlert(title: string) {
  return <Alert variant='success'>The post {title} has been added.</Alert>
}

function createUpdatePostAlert(title: string) {
  return <Alert variant='success'>The post {title} has been updated.</Alert>
}

function createDeletePostAlert(title: string) {
  return <Alert variant='warning'>The post {title} has been deleted.</Alert>
}

function createErrorAlert(message: string) {
  return <Alert variant='danger'>Error: {message}</Alert>
}
