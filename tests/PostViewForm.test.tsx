import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AlertProvider } from '@/app/_components/AlertProvider'
import { PostViewForm } from '@/app/posts/[slug]/_components/PostViewForm'
import { deletePostAction } from '@/lib/actions'
import { post } from '@/tests/test-utils'

describe('PostViewForm', () => {
  it('shows success alert after deleting', async () => {
    vi.mocked(deletePostAction).mockResolvedValue({ title: 'Deleted post title' })

    render(
      <AlertProvider>
        <PostViewForm post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    const alert = await screen.findByText(/success/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows server error alert', async () => {
    vi.mocked(deletePostAction).mockResolvedValue({ error: 'Server error message' })

    render(
      <AlertProvider>
        <PostViewForm post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })
})
