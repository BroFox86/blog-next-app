import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'

import s from './Editor.module.scss'
import { Spinner } from './Spinner'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner label='Loading Quill editor' />,
})

type Props = {
  content: string
  setContent: any
}

export function Editor(props: Props) {
  const { content, setContent } = props

  return (
    <div className={s.editorWrapper}>
      <QuillNoSSRWrapper className={s.editor} theme='snow' value={content} onChange={setContent} />
    </div>
  )
}
