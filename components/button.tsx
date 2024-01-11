import clsx from 'clsx'
import Link from 'next/link'

import s from './button.module.scss'

type CommonProps = {
  className?: any
  label: string
  variant: 'primary' | 'danger'
  fullWidth?: boolean
}

type LinkProps = {
  as: 'link'
  href: string
  external?: boolean
  type?: never
  isDisabled?: never
  isPending?: never
  onClick?: never
}

type ButtonProps = {
  onClick: React.MouseEventHandler
  type?: 'button' | 'submit' | 'reset' | undefined
  isDisabled?: boolean
  isPending?: boolean
  as?: never
  external?: never
  href?: never
}

type ConditionalProps = LinkProps | ButtonProps

type Props = CommonProps & ConditionalProps

export function Button(props: Props) {
  const { className, as, label, type = 'button', href, isDisabled, isPending, onClick } = props
  const variant: string = props.variant.toLowerCase()

  return as !== 'link' ? (
    <button className={clsx(s.button, s[variant], className)} type={type} disabled={isDisabled} onClick={onClick}>
      {label}
      {isPending ? <ButtonSpinner /> : null}
    </button>
  ) : (
    <Link className={clsx(s.button, s[variant], className)} href={href || '/'}>
      {label}
    </Link>
  )
}

function ButtonSpinner() {
  return (
    <div className={s.spinnerWrapper}>
      <div className={s.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
