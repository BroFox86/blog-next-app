import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { HomePostForm } from '@/app/_components/HomePostForm'
import { addPostAction } from '@/lib/actions'
import { AlertProvider } from '@/shared/AlertProvider'

describe('HomePostForm', () => {
  it('shows error alert after empty title', async () => {
    render(
      <AlertProvider>
        <HomePostForm />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByTestId('mock-editor'), 'Post content')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const alert = await screen.findByText(/fill out/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows error alert after empty content', async () => {
    render(
      <AlertProvider>
        <HomePostForm />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/post title/i), 'My New Post')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const alert = await screen.findByText(/fill out/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows success alert after adding post', async () => {
    vi.mocked(addPostAction).mockResolvedValue({ success: true })

    render(
      <AlertProvider>
        <HomePostForm />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/post title/i), 'My New Post')
    await user.type(screen.getByTestId('mock-editor'), 'Post content')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const alert = await screen.findByText(/success/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows server error alert', async () => {
    vi.mocked(addPostAction).mockResolvedValue({ error: 'Server error message' })

    render(
      <AlertProvider>
        <HomePostForm />
      </AlertProvider>
    )

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/post title/i), 'My New Post')
    await user.type(screen.getByTestId('mock-editor'), 'Post content')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })
})
