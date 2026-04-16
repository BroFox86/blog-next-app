import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { getAllPostsAction, searchPostAction } from '@/lib/actions'
import { AlertProvider } from '@/shared/AlertProvider'
import { PostList, PostListQuery } from '@/shared/PostList'
import { post } from '@/tests/test-utils'

describe('PostList', () => {
  it('links entire card to post detail', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ posts: [post] })

    const ResolvedComponent = await PostList({ sort: '', limit: '6' })

    render(ResolvedComponent)

    const link = screen.getByRole('link', { name: new RegExp(post.title, 'i') })

    expect(link).toHaveAttribute('href', expect.stringContaining(post.slug))
  })

  it('shows no posts', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostList({ sort: '', limit: '6' })

    render(ResolvedComponent)

    expect(screen.getByText(/no posts/i)).toBeInTheDocument()
  })

  it('shows server error alert', async () => {
    vi.mocked(getAllPostsAction).mockResolvedValue({ error: 'Server error message' })

    const ResolvedComponent = await PostList({ sort: '', limit: '6' })

    render(<AlertProvider>{ResolvedComponent}</AlertProvider>)

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })

  it('links preview to post detail with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [post] })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query', sort: '', limit: '6' })

    render(ResolvedComponent)

    const link = screen.getByRole('link', { name: new RegExp(post.title, 'i') })

    expect(link).toHaveAttribute('href', expect.stringContaining(post.slug))
  })

  it('shows no posts with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query', sort: '', limit: '6' })

    render(ResolvedComponent)

    expect(screen.getByText(/found 0 matches/i)).toBeInTheDocument()
  })

  it('shows no query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ posts: [] })

    const ResolvedComponent = await PostListQuery({ query: '', sort: '', limit: '6' })

    render(ResolvedComponent)

    expect(screen.getByText(/no query/i)).toBeInTheDocument()
  })

  it('shows server error alert with query', async () => {
    vi.mocked(searchPostAction).mockResolvedValue({ error: 'Server error message' })

    const ResolvedComponent = await PostListQuery({ query: 'mock-query', sort: '', limit: '6' })

    render(<AlertProvider>{ResolvedComponent}</AlertProvider>)

    const alert = await screen.findByText(/error/i)

    expect(alert).toBeInTheDocument()
  })
})
