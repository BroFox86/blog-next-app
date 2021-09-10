import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
import s from "./Component.module.scss"

interface Props {
  extraStyles?: string
}

export function Component(props: Props) {
  return (
    <div className={clsx(s.component, props.extraStyles)}>
      {/* Code */}
    </div>
  )
}
