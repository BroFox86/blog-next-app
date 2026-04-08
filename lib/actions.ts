'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

import { db } from '@/lib/db'
import { TITLE_MAX_LENGTH, WAIT_DURATION } from '@/utils/constants'
import { getSafeHtml, getSluggedText } from '@/utils/format'
import { wait } from '@/utils/wait'

const PostSchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  title: z.string().min(2).max(TITLE_MAX_LENGTH).trim(),
  content: z.string()
})

const SearchSchema = z.object({
  query: z.string().min(2).max(30).trim()
})

export async function getAllPostsAction(sort: string) {
  await wait(WAIT_DURATION)

  try {
    return {
      posts: await db.post.findMany({
        // take: 3,
        orderBy: {
          createdAt: sort === 'date_asc' ? 'asc' : 'desc'
        }
      })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { error: errorMessage }
  }
}

export async function addPostAction(rawTitle: string, rawContent: string) {
  const result = PostSchema.safeParse({
    slug: getSluggedText(rawTitle),
    title: rawTitle,
    content: rawContent
  })

  if (!result.success) {
    const errorMessage = result.error.message

    return { error: errorMessage }
  }

  const { slug, title, content } = result.data

  try {
    await db.post.create({
      data: {
        slug: slug,
        title: title,
        content: await getSafeHtml(content),
        imageUrl: '/images/cover-7.jpg'
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { error: errorMessage }
  }

  revalidatePath('/')

  return { success: true }
}

export async function getPost(slug: string) {
  return await db.post.findUnique({
    where: {
      slug: slug
    }
  })
}

export async function updatePostAction(rawId: number, rawTitle: string, rawContent: string) {
  const result = PostSchema.safeParse({
    id: rawId,
    slug: getSluggedText(rawTitle),
    title: rawTitle,
    content: rawContent
  })

  if (!result.success) {
    const errorMessage = result.error.message

    return { error: errorMessage }
  }

  const { id, slug, title, content } = result.data

  try {
    await db.post.update({
      where: { id: id },
      data: {
        slug: slug,
        title: title,
        content: await getSafeHtml(content)
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { error: errorMessage }
  }

  revalidatePath(`/`)
  revalidatePath(`/posts/${slug}`)

  return { slug: slug }
}

export async function deletePostAction(id: number) {
  let deletedPost

  try {
    deletedPost = await db.post.delete({ where: { id } })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { error: errorMessage }
  }

  revalidatePath('/', 'layout')

  return { title: deletedPost.title }
}

export async function handleSearchQuery(formData: FormData) {
  const result = SearchSchema.safeParse({
    query: formData.get('search')
  })

  if (!result.success) {
    return
  }

  const { query } = result.data

  redirect(`/search?query=${query}`)
}

export async function searchPostAction(query: string, sort: string) {
  await wait(WAIT_DURATION)

  try {
    return {
      posts: await db.post.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: {
          createdAt: sort === 'date_asc' ? 'asc' : 'desc'
        }
      })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    return { error: errorMessage }
  }
}
