import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import s from './Editor.module.scss'
import { Spinner } from './Spinner'

type Props = {
  content: string
  setContent: any
}

export function Editor(props: Props) {
  const { content, setContent } = props
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false, loading: () => <Spinner label='Loading Quill editor' /> }),
    [],
  )

  return (
    <div className={s.editorWrapper}>
      <ReactQuill className={s.editor} theme='snow' value={content} onChange={setContent} />
    </div>
  )
}
