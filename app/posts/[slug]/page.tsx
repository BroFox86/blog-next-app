import { notFound } from 'next/navigation'

import { getPost } from '@/lib/actions'
import type { Post as PostType } from '@/lib/generated/prisma/client'
import { getTextExcerpt } from '@/utils/format'

import { Post } from './_components/Post'

type Props = {
  params: { slug: string }
  searchParams: { edit: string }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return

  const { title, content }: PostType = post

  return {
    title: title,
    description: getTextExcerpt(content)
  }
}

export default async function Page({ params, searchParams: searchParamsPromise }: Props) {
  const { slug } = await params
  const searchParams = await searchParamsPromise
  const post = await getPost(slug)

  if (!post) notFound()

  return <Post searchParams={searchParams} post={post} />
}
