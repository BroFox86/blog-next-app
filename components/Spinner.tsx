import clsx from 'clsx'

import s from './Spinner.module.scss'

type Props = {
  className?: string
  label?: string
  small?: boolean
}

export function Spinner(props: Props) {
  return (
    <div className={clsx(s.root, props.small && s.small, props.className)}>
      <div className={s.text}>{props.label || 'Loading'}</div>
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
