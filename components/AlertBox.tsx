import React from 'react'

type Props = {
  alerts: Array<JSX.Element>
  hidden?: boolean
}

export function AlertBox({ alerts, hidden }: Props) {
  if (alerts.length === 0) return null

  return (
    <div hidden={hidden}>
      {alerts.map((item, index) => {
        return <React.Fragment key={index}>{item}</React.Fragment>
      })}
    </div>
  )
}
