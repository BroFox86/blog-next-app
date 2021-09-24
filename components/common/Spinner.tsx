import clsx from "clsx"
import s from "./Spinner.module.scss"

type Props = {
  extraStyles?: string
  label?: string
}

export function Spinner(props: Props) {
  return (
    <div className={clsx(s.container, props.extraStyles)}>
      <div className={s.text}>{props.label || "Loading"}</div>
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
