'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Alert } from '@/components/Alert'
import { useAlert } from '@/shared/AlertProvider'

import s from './AlertBox.module.scss'

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

  const elements = state.alerts.map((item, idx) => {
    const amount = state.alerts.length - 1
    const stackStyles = getStackStyles(amount, idx)

    return (
      <Alert key={item.id} type={item.type} onClose={() => handleClose(item.id)} style={stackStyles}>
        {item.message}
      </Alert>
    )
  })

  if (!isMounted) return

  const container = document.body.querySelector('#alert-portal')

  if (!container) return

  return createPortal(<div className={s.root}>{elements}</div>, container)
}

function getStackStyles(amount: number, idx: number) {
  const widthStep = 3
  const minWidth = 100 - widthStep * amount
  const bottomStep = 40

  return {
    width: minWidth + widthStep * idx + '%',
    bottom: bottomStep * idx + 'px'
  }
}
