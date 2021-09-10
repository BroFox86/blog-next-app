import Link from "next/link"
import clsx from "clsx"
import s from "./Button.module.scss"

interface Props {
  extraStyles?: any
  variant: string
  label: string
  as?: string
  type?: "button" | "submit" | "reset" | undefined
  href?: string
  isDisabled?: boolean
  isPending?: boolean,
  onClick?: React.MouseEventHandler
  children?: JSX.Element
}

export function Button(props: Props) {
  const {
    extraStyles,
    as,
    label,
    type,
    href,
    isDisabled,
    isPending,
    onClick,
  } = props
  const variant: string = props.variant.toLowerCase()
  let buttonType

  if (as !== "link") {
    buttonType = type || "button"
  }

  return (
    (as !== "link" ?
      <button
        className={clsx(s.button, s[variant], extraStyles)}
        type={buttonType}
        disabled={isDisabled}
        onClick={onClick}
      >
        {label}{isPending ? <ButtonSpinner /> : null}
      </button>
      :
      <Link href={href || "/"}>
        <a className={clsx(s.button, s[variant], extraStyles)}>
          {label}
        </a>
      </Link>
    )
  )
}

function ButtonSpinner() {
  return (
    <div className={s.spinnerWrapper}>
      <div className={s.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
