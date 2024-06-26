import clsx from 'clsx'
import { useRef, useState } from 'react'

import { getTransitionDuration } from '~/utilities/get-style-value'

import s from './modal.module.scss'
import { useAccessibleModal } from './use-accessible-modal'
import { useScrollLock } from './use-scroll-lock'

type Props = {
  className?: string
  isActive: boolean
  toggleModal: React.MouseEventHandler
  ariaLabelledby: string
  children: JSX.Element[]
}

export function Modal(props: Props) {
  const { className, isActive, toggleModal, children, ariaLabelledby } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const [isInitiated, setIsInitiated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isOpening = isActive && !isInitiated && !isVisible
  const isClosing = !isActive && isInitiated && isVisible

  if (isOpening) {
    setIsInitiated(true)
    setTimeout(() => setIsVisible(true), 20)
  }

  if (isClosing && modalRef.current !== null) {
    const duration: number = getTransitionDuration(modalRef.current)

    setIsVisible(false)
    setTimeout(() => setIsInitiated(false), duration)
  }

  useAccessibleModal(isActive, modalRef, toggleModal)
  useScrollLock('isFixedByModal', isInitiated)

  return isInitiated ? (
    <div
      className={clsx(s.modal, className, isVisible && s.isVisible)}
      ref={modalRef}
      role='dialog'
      aria-labelledby={ariaLabelledby}
      aria-modal
    >
      <div className={s.closeBtnOuter} onClick={toggleModal} />
      <div className={s.modalContainer}>
        <button className={s.closeBtnInner} type='button' aria-label='Close' onClick={toggleModal}>
          <ClosingIcon className={s.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  ) : null
}

function ClosingIcon({ className }: { className: string }) {
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
