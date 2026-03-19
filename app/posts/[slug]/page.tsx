import Head from 'next/head'
import { notFound } from 'next/navigation'

import { db } from '@/lib/db'

import { Post } from './_components/Post'

export type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const awaitedSearchParams = await searchParams
  const post = await db.getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post slug={slug} searchParams={awaitedSearchParams} post={post} />
    </>
  )
}
