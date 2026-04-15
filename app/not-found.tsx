import { Metadata } from 'next'

import { PostNotFound } from '../shared/PostNotFound'

export const metadata: Metadata = {
  title: 'Page not found',
  description: ''
}

export default function NotFound() {
  return <PostNotFound />
}
