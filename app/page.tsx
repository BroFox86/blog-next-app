import { HomePage } from '@/app/_components/HomePage'
export const dynamic = 'force-dynamic'

type HomePageProps = {
  searchParams: {
    sort: string
  }
}

export default async function Page({ searchParams: searchParamsPromise }: HomePageProps) {
  const searchParams = await searchParamsPromise

  return <HomePage sort={searchParams.sort} />
}
