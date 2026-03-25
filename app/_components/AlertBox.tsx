'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { Alert } from '@/components/Alert'

import { useAlert } from './AlertProvider'

export function AlertBox() {
  const [isMounted, setIsMounted] = useState(false)
  const { state, dispatch } = useAlert()

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true)
    })
  }, [])

  function handleClose(id: string) {
    dispatch({ type: 'REMOVE_ALERT', payload: id })
  }

  const alerts = state.alerts.map(item => {
    return (
      <Alert key={item.id} type={item.type} onClose={() => handleClose(item.id)}>
        {item.message}
      </Alert>
    )
  })

  if (!isMounted) return

  const container = document.body.querySelector('#alert-portal')

  if (!container) return

  return createPortal(alerts, container)
}
