import { Metadata } from 'next'

import { PostNotFound } from './_components/PostNotFound'

export const metadata: Metadata = {
  title: 'Page not found',
  description: ''
}

export default function NotFound() {
  return <PostNotFound />
}
