import { PostPreview } from '@/components/PostPreview'
import { POST_LIST_LIMIT } from '@/utils/constants'

import s from './PostList.module.scss'

export function PostListSkeleton({ limit = POST_LIST_LIMIT.toString() }: { limit: string }) {
  return (
    <div className={s.root}>
      {Array.from({ length: +limit }).map((post, index) => (
        <PostPreview key={index} skeleton />
      ))}
    </div>
  )
}
