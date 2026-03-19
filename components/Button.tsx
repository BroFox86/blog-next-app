'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

import { Spinner } from '@/components/Spinner'

import s from './Button.module.scss'

interface CommonProps {
  label: string
  variant: 'primary' | 'danger'
  fullWidth?: boolean
  children?: React.ReactNode
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'link'
  disabled?: never
  pending?: never
  external?: boolean
  type?: never
  onClick?: never
  form?: never
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean
  disabled?: boolean
  as?: never
  href?: never
  external?: never
  form?: string
}

type ConditionalProps = LinkProps | ButtonProps

type Props = CommonProps & ConditionalProps

export function Button(props: Props) {
  const { className, as, label, type = 'button', href, disabled, form, onClick } = props
  const { pending } = useFormStatus()
  const variant: string = props.variant.toLowerCase()

  return as !== 'link' ? (
    <button
      className={clsx(s.button, s[variant], className)}
      type={type}
      disabled={pending || disabled}
      form={form}
      onClick={onClick}
    >
      {label}
      {pending ? <Spinner small /> : null}
    </button>
  ) : (
    <Link className={clsx(s.button, s[variant], className)} href={href || '/'}>
      {label}
    </Link>
  )
}
