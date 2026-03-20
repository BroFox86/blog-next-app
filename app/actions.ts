'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getCleanText } from '@/utils/getCleanText'
import { getSluggedText } from '@/utils/getSluggedText'
import { wait } from '@/utils/wait'

export async function getAllPostsAction() {
  try {
    wait()

    return await db.post.findMany({
      // take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (e) {
    console.error('Database Error:', e)
  }
}

export async function addPostAction(formData: FormData) {
  let title
  let sluggedTitle
  let success

  try {
    title = formData.get('title') as string
    sluggedTitle = getSluggedText(title)
    const content = formData.get('content') as string
    const contentWithoutTags = getCleanText(content)

    if (title === '' || contentWithoutTags === '') {
      throw new Error('Fill in all the fields')
    }

    if (title.length > 100) {
      throw new Error('Title is too long')
    }

    await wait()

    await db.post.create({
      data: {
        title: title,
        slug: sluggedTitle,
        content: content,
        imageUrl: '/images/cover-7.jpg'
      }
    })

    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`./?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    revalidatePath('/')
    redirect(`./?status=success-add&message=${title}`)
  }
}

export async function handleSearchQuery(formData: FormData) {
  let query
  let success

  try {
    query = formData.get('search') as string

    if (query.length < 2) return

    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`./?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    redirect(`./search?query=${query}`)
  }
}
