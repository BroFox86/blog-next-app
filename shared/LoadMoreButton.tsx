'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'

import { Button } from '@/components/Button'
import { useCreateQueryString } from '@/utils/useCreateQueryString'

export function LoadMoreButton({ nextLimit }: { nextLimit: number }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const path = usePathname()
  const createQueryString = useCreateQueryString()

  function handleIncreaseLimit() {
    startTransition(async () => {
      router.replace(path + '?' + createQueryString('limit', nextLimit.toString()), { scroll: false })
    })
  }

  return <Button variant='primary' label='Load more' pending={isPending} onClick={handleIncreaseLimit} />
}
