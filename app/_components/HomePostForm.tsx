'use client'

import { useActionState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { addPostAction } from '@/app/actions'
import { Button } from '@/components/Button'
import { Editor } from '@/components/Editor'
import { Input } from '@/components/Input'

import s from './HomePage.module.scss'

export function HomePostForm() {
  const [actionState, formAction] = useActionState(addPostAction, null)
  const memoActionState = useMemo(() => actionState, [actionState])
  const { dispatch } = useAlert()

  useEffect(() => {
    if (!memoActionState) return

    dispatch({ type: 'ADD_ALERT', payload: memoActionState })
  }, [memoActionState, dispatch])

  return (
    <form className={s.form} action={formAction}>
      <Input label='Post title' name='title' autoComplete='off' placeholder='' maxLength={100} required />
      <Editor key={actionState?.id} />
      <Button className={s.button} type='submit' label='Add' variant='primary' />
    </form>
  )
}
