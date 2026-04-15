import { Suspense } from 'react'

import { SearchPage } from '@/app/search/_components/SearchPage'
import { Spinner } from '@/components/Spinner'
import { PostListQuery } from '@/shared/PostList'

import ScrollManager from './template'

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
  const key = `${query}-${sort}`

  return (
    <ScrollManager>
      <SearchPage query={query}>
        <Suspense key={key} fallback={<Spinner />}>
          <PostListQuery query={query} sort={sort} />
        </Suspense>
      </SearchPage>
    </ScrollManager>
  )
}
