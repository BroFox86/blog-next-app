import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AlertProvider } from '@/app/_components/AlertProvider'
import { PostList, PostListQuery } from '@/app/_components/PostList'
import { getAllPostsAction, searchPostAction } from '@/lib/actions'
import { post } from '@/tests/test-utils'

describe('PostList', () => {
  it('shows post', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ posts: [post] })

    const ResolvedComponent = await PostList({})

    render(ResolvedComponent)

    expect(screen.getByText(/view/i)).toBeInTheDocument()
  })

  it('shows no posts', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostList({})

    render(ResolvedComponent)

    expect(screen.getByText(/no posts/i)).toBeInTheDocument()
  })

  it('shows server error alert', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ error: 'Server error message' })

    const ResolvedComponent = await PostList({})

    render(<AlertProvider>{ResolvedComponent}</AlertProvider>)

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })

  it('shows post with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [post] })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query' })

    render(ResolvedComponent)

    expect(screen.getByText(/view/i)).toBeInTheDocument()
  })

  it('shows no posts with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query' })

    render(ResolvedComponent)

    expect(screen.getByText(/found 0 matches/i)).toBeInTheDocument()
  })

  it('shows no query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostListQuery({ query: '' })

    render(ResolvedComponent)

    expect(screen.getByText(/no query/i)).toBeInTheDocument()
  })

  it('shows server error alert with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ error: 'Server error message' })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query' })

    render(<AlertProvider>{ResolvedComponent}</AlertProvider>)

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })
})
