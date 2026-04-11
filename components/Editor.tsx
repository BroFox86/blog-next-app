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

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    // ['link', 'image'],
    ['link'],
    ['code', 'code-block'],
    ['clean']
  ],
  keyboard: {
    bindings: {
      tab: {
        key: 9,
        handler: function () {
          // Allows the Tab key to move focus to the next element
          return true
        }
      }
    }
  }
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
      <ReactQuill className={s.editor} theme='snow' modules={modules} value={content} onChange={onChange} />
    </div>
  )
}
