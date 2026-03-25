import { Suspense } from 'react'

import { PostList } from '@/app/_components/PostList'
import { SearchPage } from '@/app/search/_components/SearchPage'
import { Spinner } from '@/components/Spinner'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function Page({ searchParams: searchParamsPromise }: Props) {
  const searchParams = await searchParamsPromise
  const { query } = searchParams

  return (
    <SearchPage query={query}>
      <Suspense key={query} fallback={<Spinner />}>
        <PostList query={query} searchResults />
      </Suspense>
    </SearchPage>
  )
}
