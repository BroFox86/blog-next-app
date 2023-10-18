import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { getTransitionDuration } from '~/utilities/getStyleValue'

import s from './Alert.module.scss'

export interface AlertProps {
  className?: string
  variant: 'success' | 'warning' | 'danger'
  children: string | string[] | JSX.Element
}

export function Alert({ className, variant, children }: AlertProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    setTimeout(() => setIsVisible(true), 20)
  }, [])

  function handleClosing() {
    setIsVisible(false)

    setTimeout(() => {
      setIsMounted(false)
    }, getTransitionDuration(alertRef.current!))
  }

  return isMounted ? (
    <div className={clsx(s.alert, className, s[variant], isVisible && s.isVisible)} ref={alertRef} role='alert'>
      <span>{children}</span>
      <button className={s.closeButton} type='button' aria-label='Close alert' onClick={handleClosing}>
        <CloseIcon className={s.closeIcon} />
      </button>
    </div>
  ) : null
}

export function AlertLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className={s.alertLink} href={href}>
      {children}
    </Link>
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
