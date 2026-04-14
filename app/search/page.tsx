import { Suspense } from 'react'

import { PostListQuery } from '@/app/_components/PostList'
import { SearchPage } from '@/app/search/_components/SearchPage'
import { Spinner } from '@/components/Spinner'

type Props = {
  searchParams: {
    query: string
    sort: string
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
  const { query, sort } = searchParams
  // const suspenseKey = `${query}-${sort}`

  return (
    <SearchPage query={query}>
      <Suspense key={query} fallback={<Spinner />}>
        <PostListQuery query={query} sort={sort} />
      </Suspense>
    </SearchPage>
  )
}
