import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { ALERT_DURATION, ALERT_PENDING_DURATION } from '@/utils/constants'

import s from './Alert.module.scss'

export type AlertProps = {
  className?: string
  type: 'success' | 'warning' | 'error'
  onClose: () => void
  children: React.ReactNode
}

export function Alert({ className, type, onClose, children }: AlertProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { dispatch } = useAlert()
  const alertRef = useRef<HTMLDivElement>(null)

  function handleClosing() {
    setIsVisible(false)
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })

    dispatch({ type: 'PENDING', payload: true })

    setTimeout(() => {
      dispatch({ type: 'PENDING', payload: false })
    }, ALERT_PENDING_DURATION)

    const timeout = setTimeout(() => {
      handleClosing()
    }, ALERT_DURATION)

    return () => clearTimeout(timeout)
  }, [dispatch])

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (isVisible || e.target !== e.currentTarget) {
      return
    }

    if (!onClose) return

    onClose()
  }

  return (
    <div
      className={clsx(s.root, className, s[type], isVisible && s.isVisible)}
      ref={alertRef}
      role='alert'
      onTransitionEnd={handleTransitionEnd}
    >
      <span>{children}</span>
      <button className={s.closeButton} type='button' aria-label='Close alert' onClick={handleClosing}>
        <CloseIcon className={s.closeIcon} />
      </button>
    </div>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      height='25'
      viewBox='0 0 24 24'
      width='25'
    >
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
      <path d='M0 0h24v24H0z' fill='none' />
    </svg>
  )
}
