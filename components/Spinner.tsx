import clsx from 'clsx'

import s from './Spinner.module.scss'

type Props = {
  className?: string
  label?: string
  small?: boolean
  placeCenter?: boolean
}

export function Spinner({ className, label, small, placeCenter }: Props) {
  return (
    <div className={clsx(s.root, className, small && s.small, placeCenter && s.placeCenter)}>
      <div className={s.text}>{label || 'Loading'}</div>
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
