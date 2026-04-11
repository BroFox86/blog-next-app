import { notFound } from 'next/navigation'

import { getPost } from '@/lib/actions'

import { Post } from './_components/Post'

type Props = {
  params: { slug: string }
  searchParams: { edit: string }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    title: post?.title || 'Post Not Found'
  }
}

export default async function Page({ params, searchParams: searchParamsPromise }: Props) {
  const { slug } = await params
  const searchParams = await searchParamsPromise
  const post = await getPost(slug)

  if (!post) notFound()

  return <Post searchParams={searchParams} post={post} />
}
