import '@testing-library/jest-dom/vitest'

import { beforeAll, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/'
}))

vi.mock('@/lib/actions', () => ({
  getAllPostsAction: vi.fn(),
  searchPostAction: vi.fn(),
  addPostAction: vi.fn(),
  updatePostAction: vi.fn(),
  deletePostAction: vi.fn()
}))

vi.mock('@/components/Editor', () => ({
  Editor: ({ content, onChange }: { content: string; onChange: (content: string) => void }) => (
    <textarea data-testid='mock-editor' value={content} onChange={e => onChange(e.target.value)} />
  )
}))

beforeAll(() => {
  const portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'alert-portal')
  document.body.appendChild(portalRoot)
})
