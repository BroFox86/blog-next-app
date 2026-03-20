'use server'

import { db } from '@/lib/db'
import { wait } from '@/utils/wait'

export async function searchPostAction(query: string) {
  await wait()

  return await db.post.findMany({
    where: {
      OR: [{ title: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }]
    }
  })
}
