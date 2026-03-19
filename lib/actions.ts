'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCleanText } from '@/utils/getCleanText'
import { getSluggedText } from '@/utils/getSluggedText'

import { db } from './db'

export const wait = async (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export async function addPostAction(formData: FormData) {
  let title
  let success

  try {
    title = formData.get('title') as string
    const sluggedTitle = getSluggedText(title)
    const content = formData.get('content') as string
    const contentWithoutTags = getCleanText(content)

    if (title === '' || contentWithoutTags === '') {
      throw new Error('Fill in all the fields')
    }

    if (title.length > 100) {
      throw new Error('Title is too long')
    }

    await wait()

    db.addPost({
      id: sluggedTitle,
      date: new Date().toISOString(),
      image: '/images/cover-7.jpg',
      title: title,
      content: content
    })
    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    revalidatePath('/')
    redirect(`?status=success-add&message=${title}`)
  }
}

export async function updatePostAction(slug: string, formData: FormData) {
  let title
  let sluggedTitle
  let success

  try {
    const content = formData.get('content') as string
    const contentWithoutTags = getCleanText(content)

    title = formData.get('title') as string
    sluggedTitle = getSluggedText(title)

    if (title === '' || contentWithoutTags === '') {
      throw new Error('Fill in all the fields')
    }

    await wait()

    db.updatePost(slug, {
      id: sluggedTitle,
      editedDate: new Date().toISOString(),
      title: title,
      content: content
    })
    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`${slug}?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    revalidatePath(`${sluggedTitle}`)
    redirect(`${sluggedTitle}?status=success-update&message=${title}`)
  }
}

export async function deletePostAction(id: string) {
  let deletedPost
  let success

  await wait()

  try {
    deletedPost = db.deletePost(id)
    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`${id}?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    revalidatePath('/')
    redirect(`/?status=success-delete&message=${deletedPost?.title}`)
  }
}

export async function searchPostAction(formData: FormData) {
  let query
  let success

  try {
    query = formData.get('search') as string

    if (query.length < 2) {
      return
    }

    success = true
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    redirect(`/?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (success) {
    revalidatePath('/search')
    redirect(`/search?query=${query}`)
  }
}
