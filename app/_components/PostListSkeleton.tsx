import { PostPreview } from '@/components/PostPreview'

import s from './PostList.module.scss'

export async function PostListSkeleton() {
  return (
    <div className={s.root}>
      {Array.from({ length: 3 }).map((post, index) => (
        <PostPreview key={index} skeleton />
      ))}
    </div>
  )
}
