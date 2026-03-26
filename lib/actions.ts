'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getSluggedText } from '@/utils/format'
import { wait } from '@/utils/wait'

export async function getAllPostsAction() {
  wait(500)

  return await db.post.findMany({
    // take: 3,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function addPostAction(title: string, content: string) {
  const sluggedTitle = getSluggedText(title)

  await db.post.create({
    data: {
      title: title,
      slug: sluggedTitle,
      content: content,
      imageUrl: '/images/cover-7.jpg'
    }
  })

  revalidatePath('/')
}

export async function handleSearchQuery(formData: FormData) {
  const query = formData.get('search') as string

  if (query.length < 2) {
    return
  }

  redirect(`/search?query=${query}`)
}

export async function searchPostAction(query: string) {
  await wait(500)

  return await db.post.findMany({
    where: {
      OR: [{ title: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }]
    }
  })
}

export async function getPost(slug: string) {
  return await db.post.findUnique({
    where: {
      slug: slug
    }
  })
}

export async function updatePostAction(id: number, title: string, content: string) {
  const sluggedTitle = getSluggedText(title)

  await db.post.update({
    where: { id: id },
    data: {
      slug: sluggedTitle,
      title: title,
      content: content
    }
  })

  revalidatePath(`/`)
  revalidatePath(`/posts/${sluggedTitle}`)

  return sluggedTitle
}

export async function deletePostAction(id: number) {
  const deletedPost = await db.post.delete({ where: { id } })

  revalidatePath('/', 'layout')

  return deletedPost.title
}
