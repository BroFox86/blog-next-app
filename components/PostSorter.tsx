'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { type MouseEvent, MouseEventHandler, useId, useState } from 'react'

import { useCreateQueryString } from '@/utils/useCreateQueryString'
import { useOutsideClicks } from '@/utils/useOutsideClick'

import s from './PostSorter.module.scss'

export function PostSorter({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState('Newest First')
  const router = useRouter()
  const path = usePathname()
  const createQueryString = useCreateQueryString()
  const id = useId()

  function toggleDropdown(isExpanded: boolean) {
    setIsVisible(isExpanded)
  }

  function setOption(e: MouseEvent<HTMLButtonElement>, param: string) {
    const target = e.target

    if (!(target instanceof Element)) return

    const newLabel = target.textContent

    if (label === newLabel) {
      toggleDropdown(false)
      return
    }

    setLabel(newLabel)

    toggleDropdown(false)

    router.replace(path + '?' + createQueryString('sort', param), { scroll: false })
  }

  useOutsideClicks('[data-component="PostSorter"]', toggleDropdown)

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.toggleWrapper}>
        <span id={`desc-label-${id}`}>Sort by:</span>
        <button
          className={s.toggleButton}
          id={`selected-label-${id}`}
          type='button'
          data-component='PostSorter'
          aria-haspopup='true'
          aria-controls={`sort-list-${id}`}
          aria-expanded={isVisible}
          aria-labelledby={`desc-label-${id} selected-label-${id}`}
          onClick={() => toggleDropdown(!isVisible)}
        >
          <span>{label}</span>
          <DropdownIcon />
        </button>
      </div>

      <div className={clsx(s.dropdown, isVisible && s.isVisible)}>
        <ul className={s.dropdownInner} id={`sort-list-${id}`} role='menu' aria-labelledby={`selected-label-${id}`}>
          <DropdownItem onClick={e => setOption(e, 'date_desc')}>Newest First</DropdownItem>
          <DropdownItem onClick={e => setOption(e, 'date_asc')}>Oldest First</DropdownItem>
        </ul>
      </div>
    </div>
  )
}

type DropdownItemProps = { onClick: MouseEventHandler<HTMLButtonElement>; children: React.ReactNode }

function DropdownItem({ onClick, children }: DropdownItemProps) {
  return (
    <li role='none'>
      <button className={s.dropdownButton} role='menuitem' onClick={onClick}>
        {children}
      </button>
    </li>
  )
}

function DropdownIcon() {
  return (
    <svg
      className={s.toggleIcon}
      width='12'
      height='13'
      viewBox='0 0 12 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={s.toggleIconPath}
        d='M4.5897e-07 4.25L5.24537e-07 3.5L0.857143 3.5L6 8L11.1429 3.5L12 3.5L12 4.25L6 9.5L4.5897e-07 4.25Z'
        fill='black'
      />
    </svg>
  )
}
