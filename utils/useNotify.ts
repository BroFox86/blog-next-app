import { useAlert } from '@/app/_components/AlertProvider'

export function useNotify() {
  const { dispatch } = useAlert()

  return {
    fillOut: () => {
      dispatch({
        type: 'ADD_ALERT',
        payload: {
          message: 'Fill out at least one field.',
          type: 'error',
          id: `${Date.now()}`
        }
      })
    },
    noChanges: () => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: 'There are no changes.', type: 'warning', id: `${Date.now()}` }
      })
    },
    error: (errorMessage: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: errorMessage, type: 'error', id: `${Date.now()}` }
      })
    },
    addPost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `The post ${title} has been added.`, type: 'success', id: `${Date.now()}` }
      })
    },
    updatePost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `The post ${title} has been updated.`, type: 'success', id: `${Date.now()}` }
      })
    },
    removePost: (title: string) => {
      dispatch({
        type: 'ADD_ALERT',
        payload: { message: `The post ${title} has been removed.`, type: 'warning', id: `${Date.now()}` }
      })
    }
  }
}
