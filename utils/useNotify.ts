import { useAlert } from '@/shared/AlertProvider'

export function useNotify() {
  const { dispatch } = useAlert()

  return {
    fillOut: () => {
      dispatch({
        type: 'ADD_ALERT',
        payload: {
          message: 'Error: Fill out at least one field.',
          type: 'error',
          id: `${Date.now()}`
        }
      })
    },
    noChanges: () => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: 'Warning: There are no changes.', type: 'warning', id: `${Date.now()}` }
      })
    },
    addPost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `Success: The post ${title} has been added.`, type: 'success', id: `${Date.now()}` }
      })
    },
    updatePost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `Success: The post ${title} has been updated.`, type: 'success', id: `${Date.now()}` }
      })
    },
    removePost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `Success: The post ${title} has been removed.`, type: 'warning', id: `${Date.now()}` }
      })
    },
    error: (errorMessage: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: errorMessage, type: 'error', id: `${Date.now()}` }
      })
    }
  }
}
