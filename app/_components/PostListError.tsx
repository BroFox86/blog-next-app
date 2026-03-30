'use client'

import { useEffect, useRef } from 'react'

import { useNotify } from '@/utils/useNotify'

import s from './PostList.module.scss'

export function PostListError() {
  const hasFired = useRef(false)
  const notify = useNotify()

  useEffect(() => {
    if (hasFired.current) return

    hasFired.current = true

    notify.error('Error: Unable to load posts.')
  }, [notify])

  return <p className={s.noPostsMessage}>Something went wrong. Please try again later.</p>
}
