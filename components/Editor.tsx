'use client'

import 'react-quill-new/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import ReactQuill from 'react-quill-new'

import s from './Editor.module.scss'
import { Spinner } from './Spinner'

type Props = {
  content?: string
  onChange: ReactQuill.ReactQuillProps['onChange']
}

export function Editor({ content, onChange }: Props) {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import('react-quill-new'), {
        ssr: false,
        loading: () => <Spinner label='Loading Quill...' placeCenter />
      }),
    []
  )

  return (
    <div className={s.wrapper}>
      <ReactQuill className={s.editor} theme='snow' value={content} onChange={onChange} />
    </div>
  )
}
