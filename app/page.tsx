import { HomePage } from '@/app/_components/HomePage'
export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams: searchParamsPromise
}: {
  searchParams: {
    sort: string
    limit: string
  }
}) {
  const searchParams = await searchParamsPromise

  return <HomePage sort={searchParams.sort} limit={searchParams.limit} />
}
