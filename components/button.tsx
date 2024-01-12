import clsx from 'clsx'
import Link from 'next/link'

import s from './button.module.scss'

interface CommonProps {
  label: string
  variant: 'primary' | 'danger'
  fullWidth?: boolean
  children?: JSX.Element | string
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'link'
  disabled?: never
  pending?: never
  external?: boolean
  type?: never
  onClick?: never
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean
  disabled?: boolean
  as?: never
  href?: never
  external?: never
}

type ConditionalProps = LinkProps | ButtonProps

type Props = CommonProps & ConditionalProps

export function Button(props: Props) {
  const { className, as, label, type = 'button', href, disabled, pending, onClick } = props
  const variant: string = props.variant.toLowerCase()

  return as !== 'link' ? (
    <button className={clsx(s.button, s[variant], className)} type={type} disabled={disabled} onClick={onClick}>
      {label}
      {pending ? <ButtonSpinner /> : null}
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
