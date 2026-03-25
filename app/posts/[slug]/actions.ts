'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

import type { AlertData } from '@/app/_components/AlertProvider'
import { db } from '@/lib/db'
import { getCleanText } from '@/utils/getCleanText'
import { getSluggedText } from '@/utils/getSluggedText'
import { wait } from '@/utils/wait'
import type { Post } from '@/lib/generated/prisma/client'

export async function getPost(slug: string) {
  await wait(500)

  return await db.post.findUnique({
    where: {
      slug: slug
    }
  })
}

export async function updatePostAction(post: Post, formData: FormData) {
  const { id, title: oldTitle, content: oldContent } = post
  let title
  let sluggedTitle

  try {
    const content = formData.get('content') as string
    const contentWithoutTags = getCleanText(content)

    title = formData.get('title') as string
    sluggedTitle = getSluggedText(title)

    if (title === '' || contentWithoutTags === '') {
      return { alertData: { type: 'error', message: 'Fill out all the fields', id: randomUUID() } as AlertData }
    }

    if (title === oldTitle && content === oldContent) {
      return { alertData: { type: 'error', message: 'There are no changes', id: randomUUID() } as AlertData }
    }

    await db.post.update({
      where: { id: id },
      data: {
        slug: sluggedTitle,
        title: title,
        content: content
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { alertData: { type: 'error', message: errorMessage, id: randomUUID() } as AlertData }
  }

  revalidatePath(`/`)
  revalidatePath(`/posts/${sluggedTitle}`)

  return {
    slug: sluggedTitle,
    alertData: {
      type: 'primary',
      message: `The post ${title} has been updated`,
      id: randomUUID()
    } as AlertData
  }
}

export async function deletePostAction(id: number) {
  let deletedPost

  try {
    deletedPost = await db.post.delete({ where: { id } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { type: 'error', message: errorMessage, id: randomUUID() } as AlertData
  }

  if (!deletedPost) return

  revalidatePath('/')
  revalidatePath(`/posts/${deletedPost.slug}`)

  return {
    type: 'attention',
    message: `The post ${deletedPost.title} has been removed.`,
    id: randomUUID()
  } as AlertData
}
