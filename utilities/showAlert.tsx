import { Alert } from '~/components/common/Alert'
import { AlertProps } from '~/components/common/Alert'

export function showAlert(
  alerts: Array<JSX.Element>,
  setAlerts: Function,
  variant: AlertProps['variant'],
  content: AlertProps['children']
) {
  setAlerts(alerts.concat(<Alert variant={variant}>{content}</Alert>))
}
