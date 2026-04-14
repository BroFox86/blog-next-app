'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as zod from 'zod'

import { db } from '@/lib/db'
import { TITLE_MAX_LENGTH, WAIT_DURATION } from '@/utils/constants'
import { getSafeHtml, getSluggedText } from '@/utils/format'

export const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const PostSchema = zod.object({
  id: zod.number().optional(),
  slug: zod.string(),
  title: zod.string().min(2).max(TITLE_MAX_LENGTH).trim(),
  content: zod.string()
})

const SearchSchema = zod.object({
  query: zod.string().min(2).max(30).trim()
})

export async function getAllPostsAction({ sort, limit }: { sort?: string; limit: number }) {
  await wait(WAIT_DURATION)

  try {
    return {
      posts: await db.post.findMany({
        take: limit,
        orderBy: {
          createdAt: sort === 'date_asc' ? 'asc' : 'desc'
        }
      })
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Database connection failed'

    return { error: message }
  }
}

export async function addPostAction(rawTitle: string, rawContent: string) {
  const result = PostSchema.safeParse({
    slug: getSluggedText(rawTitle),
    title: rawTitle,
    content: rawContent
  })

  if (!result.success) {
    return { error: result.error.message }
  }

  const { slug, title, content } = result.data

  try {
    await db.post.create({
      data: {
        slug: slug,
        title: title,
        content: await getSafeHtml(content),
        imageUrl: `/images/cover-${random(1, 6)}.jpg`
      }
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Database connection failed'

    return { error: message }
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

export async function updatePostAction({
  id: rawId,
  title: rawTitle,
  content: rawContent
}: {
  id: number
  title: string
  content: string
}) {
  const result = PostSchema.safeParse({
    id: rawId,
    slug: getSluggedText(rawTitle),
    title: rawTitle,
    content: rawContent
  })

  if (!result.success) {
    return { error: result.error.message }
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
    const message = e instanceof Error ? e.message : 'Database connection failed'

    return { error: message }
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
    const message = e instanceof Error ? e.message : 'Database connection failed'

    return { error: message }
  }

  revalidatePath('/', 'layout')

  return { title: deletedPost.title }
}

export async function handleSearchQuery(formData: FormData) {
  const result = SearchSchema.safeParse({
    query: formData.get('search')
  })

  if (!result.success) return

  const { query } = result.data

  redirect(`/search?query=${query}`)
}

export async function searchPostAction({ query, sort, limit }: { query: string; sort?: string; limit: number }) {
  await wait(WAIT_DURATION)

  try {
    return {
      posts: await db.post.findMany({
        take: limit,
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
    const message = e instanceof Error ? e.message : 'Database connection failed'

    return { error: message }
  }
}
