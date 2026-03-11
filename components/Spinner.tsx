import clsx from 'clsx'

import s from './Spinner.module.scss'

type Props = {
  className?: string
  label?: string
}

export function Spinner(props: Props) {
  return (
    <div className={clsx(s.container, props.className)}>
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
