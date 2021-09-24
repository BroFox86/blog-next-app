import { Dispatch, SetStateAction } from "react"
import dynamic from "next/dynamic"
import { Input } from "~/components/form-elements/Input"
import { Spinner } from "../common/Spinner"
import s from "./PostForm.module.scss"
import "react-quill/dist/quill.snow.css"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner label="Loading Quill editor" />,
})

type Props = {
  title: string
  content: string
  setTitle: Dispatch<SetStateAction<string>>
  setContent: any
}

export function PostForm(props: Props) {
  const {
    title,
    content,
    setTitle,
    setContent,
  } = props

  return (
    <>
      <Input
        label="Post title"
        name="titleInput"
        autoComplete="off"
        placeholder=""
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        required
      />
      <div className={s.editorWrapper}>
        <QuillNoSSRWrapper
          className={s.editor}
          theme="snow"
          value={content}
          onChange={setContent}
        />
      </div>
    </>
  )
}
