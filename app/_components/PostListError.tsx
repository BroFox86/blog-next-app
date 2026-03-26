'use client'

import { useEffect, useRef } from 'react'

import { useAlert } from '@/app/_components/AlertProvider'
import { setErrorAlert } from '@/utils/alerts'

import s from './PostList.module.scss'

export function PostListError({ error }: { error: string }) {
  const hasFired = useRef(false)
  const { dispatch } = useAlert()

  useEffect(() => {
    if (hasFired.current) return

    hasFired.current = true

    setErrorAlert(dispatch, 'Error: Unable to load posts.')

    console.log(error)
  }, [dispatch, error])

  return <p className={s.noPostsMessage}>Something went wrong. Please try again later.</p>
}
