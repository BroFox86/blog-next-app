import Head from 'next/head'
import { notFound } from 'next/navigation'

import { getPost } from '@/lib/actions'

import { Post } from './_components/Post'

export type Props = {
  params: { slug: string }
  searchParams: {
    edit: string
  }
}

export default async function Page({ params, searchParams: searchParamsPromise }: Props) {
  const { slug } = await params
  const searchParams = await searchParamsPromise
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post searchParams={searchParams} post={post} />
    </>
  )
}
