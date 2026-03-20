'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { getCleanText } from '@/utils/getCleanText'
import { getSluggedText } from '@/utils/getSluggedText'
import { wait } from '@/utils/wait'

export async function getPost(slug: string) {
  await wait()

  return await db.post.findUnique({
    where: {
      slug: slug
    }
  })
}

// export async function cancelEditAction(slug: string) {
//   redirect(`/posts/${slug}`, RedirectType.replace)
// }

export async function updatePostAction(id: number, formData: FormData) {
  let title
  let sluggedTitle
  let errorOccurred
  let errorMessage = ''

  try {
    const content = formData.get('content') as string
    const contentWithoutTags = getCleanText(content)

    title = formData.get('title') as string
    sluggedTitle = getSluggedText(title)

    if (title === '' || contentWithoutTags === '') {
      return
    }

    await wait()

    await db.post.update({
      where: { id: id },
      data: {
        slug: sluggedTitle,
        title: title,
        content: content
      }
    })
  } catch (e) {
    errorOccurred = true
    errorMessage = e instanceof Error ? e.message : 'Unknown error'
  }

  if (errorOccurred) {
    redirect(`./?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  revalidatePath(`/`)
  revalidatePath(`/posts/${sluggedTitle}`)
  redirect(`/posts/${sluggedTitle}?status=success-update&message=${title}`)
}

export async function deletePostAction(id: number) {
  let deletedPost
  let errorOccurred
  let errorMessage = ''

  await wait()

  try {
    deletedPost = await db.post.delete({ where: { id } })
  } catch (e) {
    errorOccurred = true
    errorMessage = e instanceof Error ? e.message : 'Unknown error'
  }

  if (errorOccurred) {
    redirect(`./${id}?status=error&message=${encodeURIComponent(errorMessage)}`)
  }

  if (!deletedPost) return

  revalidatePath('/')
  revalidatePath(`/posts/${deletedPost.slug}`)
  redirect(`/?status=success-delete&message=${deletedPost.title}`)
}
