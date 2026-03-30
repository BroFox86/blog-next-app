'use server'

import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

import { db } from '@/lib/db'
import { getSluggedText } from '@/utils/format'
import { wait } from '@/utils/wait'

const window = new JSDOM('').window
const purify = createDOMPurify(window)

const sanitizeHtml = async (html: string): Promise<string> => {
  return purify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 's', 'u'],
    ALLOWED_ATTR: ['class', 'href', 'target', 'rel', 'data-list']
  })
}

const PostSchema = z.object({
  slug: z.string(),
  title: z.string().min(2).max(10).trim(),
  content: z.string()
})

const SearchSchema = z.object({
  query: z.string().min(2).max(30).trim()
})

export async function getAllPostsAction() {
  await wait(500)

  try {
    return {
      posts: await db.post.findMany({
        // take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    console.log(errorMessage)

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

    console.log(errorMessage)

    return { error: errorMessage }
  }

  const { slug, title, content } = result.data

  try {
    await db.post.create({
      data: {
        slug: slug,
        title: title,
        content: await sanitizeHtml(content),
        imageUrl: '/images/cover-7.jpg'
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    console.log(errorMessage)

    return { error: errorMessage }
  }

  revalidatePath('/')
}

export async function getPost(slug: string) {
  return await db.post.findUnique({
    where: {
      slug: slug
    }
  })
}

export async function updatePostAction(id: number, rawTitle: string, rawContent: string) {
  const result = PostSchema.safeParse({
    slug: getSluggedText(rawTitle),
    title: rawTitle,
    content: rawContent
  })

  if (!result.success) {
    const errorMessage = result.error.message

    console.log(errorMessage)

    return { error: errorMessage }
  }

  const { slug, title, content } = result.data

  try {
    await db.post.update({
      where: { id: id },
      data: {
        slug: slug,
        title: title,
        content: await sanitizeHtml(content)
      }
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    console.log(errorMessage)

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

    console.log(errorMessage)

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

export async function searchPostAction(query: string) {
  await wait(500)

  try {
    return {
      posts: await db.post.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ]
        }
      })
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'

    console.log(errorMessage)

    return { error: errorMessage }
  }
}
