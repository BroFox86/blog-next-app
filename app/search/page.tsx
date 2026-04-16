import { Suspense } from 'react'

import { SearchPage } from '@/app/search/_components/SearchPage'
import ScrollManager from '@/app/search/template'
import { Spinner } from '@/components/Spinner'
import { PostListQuery } from '@/shared/PostList'

type Props = {
  searchParams: {
    query: string
    sort: string
    limit: string
  }
}

export async function generateMetadata({ searchParams: searchParamsPromise }: Props) {
  const { query } = await searchParamsPromise
  let pageTitle

  if (query) {
    pageTitle = `Search results for ${query}`
  } else {
    pageTitle = 'No query provided'
  }

  return {
    title: pageTitle,
    description: ''
  }
}

export default async function Page({ searchParams: searchParamsPromise }: Props) {
  const searchParams = await searchParamsPromise
  const { query, sort, limit } = searchParams
  const key = `${query}-${sort}`

  return (
    <ScrollManager>
      <SearchPage query={query}>
        <Suspense key={key} fallback={<Spinner />}>
          <PostListQuery query={query} sort={sort} limit={limit} />
        </Suspense>
      </SearchPage>
    </ScrollManager>
  )
}
