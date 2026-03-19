'use client'

import 'react-quill-new/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

import s from './Editor.module.scss'
import { Spinner } from './Spinner'

type Props = {
  content?: string
}

export function Editor(props: Props) {
  const [content, setContent] = useState(props.content || '')

  function handleSetContent(value: string) {
    setContent(value)
  }

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <Spinner label='Loading Quill...' /> }),
    []
  )

  return (
    <div className={s.wrapper}>
      <ReactQuill className={s.editor} theme='snow' value={content} onChange={handleSetContent} />
      <input type='hidden' name='content' value={content} />
    </div>
  )
}
