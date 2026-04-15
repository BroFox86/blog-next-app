import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PostEdit } from '@/app/posts/[slug]/_components/PostEdit'
import { updatePostAction } from '@/lib/actions'
import { AlertProvider } from '@/shared/AlertProvider'
import { post } from '@/tests/test-utils'

describe('PostEdit', () => {
  it('shows warning alert after same title & content', async () => {
    render(
      <AlertProvider>
        <PostEdit post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /update/i }))

    const alert = await screen.findByText(/warning/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows error alert after empty title', async () => {
    render(
      <AlertProvider>
        <PostEdit post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()
    const titleInput = screen.getByLabelText(/post title/i)

    await user.clear(titleInput)
    await user.click(screen.getByRole('button', { name: /update/i }))

    const alert = await screen.findByText(/fill out/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows error alert after empty content', async () => {
    render(
      <AlertProvider>
        <PostEdit post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()
    const contentInput = screen.getByTestId('mock-editor')

    await user.clear(contentInput)
    await user.click(screen.getByRole('button', { name: /update/i }))

    const alert = await screen.findByText(/fill out/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows success alert after updating post', async () => {
    vi.mocked(updatePostAction).mockResolvedValue({ slug: 'post-slug' })

    render(
      <AlertProvider>
        <PostEdit post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/post title/i), 'My New Post')
    await user.type(screen.getByTestId('mock-editor'), 'Post content')
    await user.click(screen.getByRole('button', { name: /update/i }))

    const alert = await screen.findByText(/success/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows server error alert after', async () => {
    vi.mocked(updatePostAction).mockResolvedValue({ error: 'Server error message' })

    render(
      <AlertProvider>
        <PostEdit post={post} />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/post title/i), 'My New Post')
    await user.type(screen.getByTestId('mock-editor'), 'Post content')
    await user.click(screen.getByRole('button', { name: /update/i }))

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })
})
