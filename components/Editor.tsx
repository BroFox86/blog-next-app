'use client'

import 'react-quill-new/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import ReactQuill from 'react-quill-new'

import s from './Editor.module.scss'
import { Spinner } from './Spinner'

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

export function Editor({ content, onChange }: { content?: string; onChange: ReactQuill.ReactQuillProps['onChange'] }) {
  // Solve accessibility warnings
  const quillRef = (node: HTMLDivElement) => {
    if (node === null) return

    const headingSelect = document.querySelector('select.ql-header')
    const previewLink = document.querySelector('.ql-preview')
    const previewInput = document.querySelector('.ql-tooltip input')

    if (!headingSelect || !previewLink || !previewInput) return

    headingSelect.setAttribute('aria-label', 'Headings')
    previewLink.setAttribute('aria-label', 'Tooltip link')
    previewInput.setAttribute('aria-label', 'Tooltip input')
  }

  const ReactQuill = useMemo(
    () =>
      dynamic(() => import('react-quill-new'), {
        ssr: false,
        loading: () => <Spinner className={s.spinner} label='Loading Quill...' placeCenter />
      }),
    []
  )

  return (
    <div className={s.root} ref={quillRef}>
      <ReactQuill className={s.quill} theme='snow' modules={modules} value={content} onChange={onChange} />
    </div>
  )
}
