'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getCleanText } from '@/utils/getCleanText'
import { getSluggedText } from '@/utils/getSluggedText'
import { wait } from '@/utils/wait'

import type { AlertData } from './_components/AlertProvider'

export async function getAllPostsAction() {
  wait(500)

  return await db.post.findMany({
    // take: 3,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function addPostAction(initialState: unknown, formData: FormData) {
  let title
  let sluggedTitle

  try {
    title = formData.get('title') as string
    sluggedTitle = getSluggedText(title)

    const content = formData.get('content') as string
    const textContent = getCleanText(content)

    if (title === '' || textContent === '' || title.length > 100) {
      return
    }

    await db.post.create({
      data: {
        title: title,
        slug: sluggedTitle,
        content: content,
        imageUrl: '/images/cover-7.jpg'
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { type: 'error', message: errorMessage, id: randomUUID() } as AlertData
  }

  revalidatePath('/')

  return { type: 'primary', message: `The post ${title} has been added`, id: randomUUID() } as AlertData
}

export async function handleSearchQuery(formData: FormData) {
  const query = formData.get('search') as string

  if (query.length < 2) {
    return
  }

  redirect(`./search?query=${query}`)
}
