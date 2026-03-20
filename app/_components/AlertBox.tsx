'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Alert } from '@/components/Alert'

export function AlertBox() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const status = searchParams.get('status')
  const message = searchParams.get('message') || ''

  function closeAlert() {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('status')
    params.delete('message')

    router.replace(`${pathname}?${params}`, { scroll: false })
  }

  if (!status) return null

  const getAlert = () => {
    switch (status) {
      case 'success-add':
        return (
          <Alert variant='success' onClose={closeAlert}>
            The post {message} has been added.
          </Alert>
        )
      case 'success-update':
        return (
          <Alert variant='success' onClose={closeAlert}>
            The post {message} has been updated.
          </Alert>
        )
      case 'success-delete':
        return (
          <Alert variant='warning' onClose={closeAlert}>
            The post {message} has been deleted.
          </Alert>
        )
      case 'error':
        return (
          <Alert variant='danger' onClose={closeAlert}>
            Error: {message}
          </Alert>
        )
      default:
        return null
    }
  }

  return <div>{getAlert()}</div>
}
