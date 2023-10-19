import { Alert } from '~/components/Alert'
import { AlertProps } from '~/components/Alert'

export function showAlert(
  alerts: Array<JSX.Element>,
  setAlerts: Function,
  variant: AlertProps['variant'],
  content: AlertProps['children']
) {
  setAlerts(alerts.concat(<Alert variant={variant}>{content}</Alert>))
}
