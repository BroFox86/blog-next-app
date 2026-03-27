import type { Dispatch } from 'react'

import type { AlertAction } from '@/app/_components/AlertProvider'

export function setFillOutAlert(dispatch: Dispatch<AlertAction>) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: 'Fill out at least one field.', type: 'error', id: `${Date.now()}` }
  })
}

export function setNoChangesAlert(dispatch: Dispatch<AlertAction>) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: 'There are no changes.', type: 'warning', id: `${Date.now()}` }
  })
}

export function setErrorAlert(dispatch: Dispatch<AlertAction>, errorMessage: string) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: errorMessage, type: 'error', id: `${Date.now()}` }
  })
}

export function setAddPostAlert(dispatch: Dispatch<AlertAction>, title: string) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: `The post ${title} has been added.`, type: 'success', id: `${Date.now()}` }
  })
}

export function setUpdatePostAlert(dispatch: Dispatch<AlertAction>, title: string) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: `The post ${title} has been updated.`, type: 'success', id: `${Date.now()}` }
  })
}

export function setRemovePostAlert(dispatch: Dispatch<AlertAction>, title: string) {
  dispatch({
    type: 'ADD_ALERT',
    payload: { message: `The post ${title} has been removed.`, type: 'warning', id: `${Date.now()}` }
  })
}
