import clsx from 'clsx'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useScrollLock } from '@/utils/useScrollLock'

import s from './Modal.module.scss'
import { handleTransitionEnd, useModalLogic } from './useModalLogic'

type Props = {
  className?: string
  variant: 'small'
  label: string
  animation: 'zoomIn'
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ className, label, variant, animation, open, onClose, children }: Props) {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const initialFocusRef = useRef<HTMLElement | null>(null)

  useModalLogic({ open, setIsMounted, setIsVisible, initialFocusRef })

  useScrollLock(open, 'isFixedByModal')

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'Escape') return

    onClose()
  }

  if (!isMounted) return null

  const modalElement = (
    <>
      <div
        className={clsx(s.root, s[variant], s[animation], className, isVisible && s.isVisible)}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modalHeading'
        onKeyDown={handleKeyDown}
      >
        <div
          className={clsx(s.inner, isVisible && s.isVisible)}
          onTransitionEnd={e => handleTransitionEnd({ e, isVisible, setIsMounted, initialFocusRef })}
        >
          <header className={s.header}>
            <h2 className={s.heading} id='modalHeading'>
              {label}
            </h2>
            <button className={s.closeButton} type='button' aria-label='Close' onClick={onClose}>
              <CloseIcon className={s.closeIcon} />
            </button>
          </header>
          <div className={s.content}>{children}</div>
        </div>
        <div className={s.sublayer} aria-hidden='true' onClick={onClose} />
      </div>
      <div className={s.backdrop} />
    </>
  )

  return createPortal(modalElement, document.body)
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
      <path d='M0 0h24v24H0z' fill='none' />
    </svg>
  )
}
