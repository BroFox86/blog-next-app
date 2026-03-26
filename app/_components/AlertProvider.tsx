'use client'

import type { Dispatch } from 'react'
import { createContext, useContext, useReducer } from 'react'

import type { AlertProps } from '@/components/Alert'

import { AlertBox } from './AlertBox'

export type AlertData = {
  type: AlertProps['type']
  message: string
  id: string
}

type AlertState = {
  alerts: AlertData[]
}

export type AlertAction = { type: 'ADD_ALERT'; payload: AlertData } | { type: 'REMOVE_ALERT'; payload: string }

type AlertContextType = {
  state: AlertState
  dispatch: Dispatch<AlertAction>
}

const AlertContext = createContext<AlertContextType | null>(null)

function reducer(state: AlertState, action: AlertAction): AlertState {
  switch (action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      }
    default:
      return state
  }
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    alerts: []
  })

  return (
    <AlertContext value={{ state, dispatch }}>
      <AlertBox />
      {children}
    </AlertContext>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}
