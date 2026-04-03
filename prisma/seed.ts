import 'dotenv/config'

import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from '@/lib/generated/prisma/client'

const connectionString = process.env.DATABASE_URL
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function runSeed() {
  try {
    console.log('--- Starting Database Seed (HTML Mode) ---')

    console.log('Emptying Post table...')
    await prisma.post.deleteMany()

    const posts = [
      {
        title: 'Welcome to the New Blog',
        slug: 'welcome-new-blog',
        imageUrl: '/images/cover-1.jpg',
        content: `
          <h2>Getting Started with Quill</h2>
          <p>This post was seeded using <strong>raw HTML tags</strong> to ensure compatibility with the rich text editor. In a modern stack, we often store content this way to preserve formatting.</p>

          <h3>Key Features of our Stack:</h3>
          <ul>
            <li><strong>Next.js 16:</strong> For lightning-fast server rendering.</li>
            <li><strong>Prisma 7:</strong> For type-safe database access.</li>
            <li><strong>Neon:</strong> For serverless PostgreSQL branching.</li>
          </ul>

          <p>Below is an example of a code snippet stored as escaped text:</p>
          <pre><code>npx prisma db push</code></pre>

          <blockquote>"The digital world is built on well-structured data."</blockquote>
        `.trim()
      },
      {
        title: 'How to Manage Your Database',
        slug: 'manage-database-guide',
        imageUrl: '/images/cover-2.jpg',
        content: `
          <h2>Database Hygiene</h2>
          <p>Maintaining a clean database is essential. Here is a quick <em>checklist</em> for developers:</p>

          <ol>
            <li>Run <strong>npx prisma generate</strong> after every schema change.</li>
            <li>Use <strong>branching</strong> in Neon for risky migrations.</li>
            <li>Keep your seed scripts updated for easy local testing.</li>
          </ol>

          <p>If you encounter an error, check your <code>.env</code> file first!</p>
        `.trim()
      },
      {
        title: 'Advanced Web Patterns for 2026',
        slug: 'advanced-web-patterns-2026',
        imageUrl: '/images/cover-3.jpg',
        content: `
          <h2>Building for Scale</h2>
          <p>As your blog grows, you need to think about <strong>Performance</strong> and <strong>User Experience</strong>. Using a <em>Rich Text Editor</em> like Quill allows you to create professional layouts without writing manual HTML every time.</p>

          <h3>Current Tech Stack Checklist:</h3>
          <ul>
            <li><strong>Database:</strong> Neon (PostgreSQL) with Prisma 7</li>
            <li><strong>Frontend:</strong> Next.js App Router</li>
            <li><strong>Styling:</strong> Tailwind CSS + Quill Theme</li>
          </ul>

          <p>One of the most important patterns is <strong>Incremental Static Regeneration (ISR)</strong>. It allows you to:</p>
          <ol>
            <li>Keep your site fast with static HTML.</li>
            <li>Update the content in the background without a full rebuild.</li>
            <li>Provide a "Real-time" feel for your users.</li>
          </ol>

          <p>Try adding a <code>console.log('Post rendered!')</code> in your Server Component to see how often the page actually updates!</p>

          <blockquote>"Optimization is not just about speed; it's about the developer's sanity."</blockquote>
        `.trim()
      }
    ]

    console.log('Inserting HTML posts into Neon...')
    for (const post of posts) {
      await prisma.post.create({ data: post })
    }
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('Disconnected from Prisma.')
  }
}

runSeed()
