import 'dotenv/config'

import { PrismaNeon } from '@prisma/adapter-neon'
import { minify } from 'html-minifier-terser'

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

          <h2>Key Features of our Stack:</h2>
          <ul>
            <li><strong>Next.js 16:</strong> For lightning-fast server rendering.</li>
            <li><strong>Prisma 7:</strong> For type-safe database access.</li>
            <li><strong>Neon:</strong> For serverless PostgreSQL branching.</li>
          </ul>

          <p>Below is an example of a code snippet stored as escaped text:</p>
          <p><code>npx prisma db push</code></p>

          <blockquote>"The digital world is built on well-structured data."</blockquote>
        `.trim(),
        createdAt: new Date('2023-01-01T10:00:00Z'),
        updatedAt: new Date('2023-01-01T10:00:00Z')
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
        `.trim(),
        createdAt: new Date('2026-01-15T12:00:00Z'),
        updatedAt: new Date('2026-04-01T09:30:00Z')
      },
      {
        title: 'Advanced Web Patterns for 2026',
        slug: 'advanced-web-patterns-2026',
        imageUrl: '/images/cover-3.jpg',
        content: `
          <h2>Building for Scale</h2>
          <p>As your blog grows, you need to think about <strong>Performance</strong> and <strong>User Experience</strong>. Using a <em>Rich Text Editor</em> like Quill allows you to create professional layouts without writing manual HTML every time.</p>

          <h2>Current Tech Stack Checklist:</h2>
          <ul>
            <li><strong>Database:</strong> Neon (PostgreSQL) with Prisma 7</li>
            <li><strong>Frontend:</strong> Next.js App Router</li>
            <li><strong>Styling:</strong> SCSS Modules + Quill Theme</li>
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
      },
      {
        title: 'Tactical Lessons from the Punic Wars',
        slug: 'punic-wars-tactics',
        imageUrl: '/images/cover-4.jpg',
        content: `
          <h2>Strategic Maneuvers</h2>
          <p>History isn't just about dates; it's about <strong>strategy</strong>. The way Hannibal used the landscape at the <em>Battle of Cannae</em> is a masterclass in tactical encirclement.</p>
          
          <h2>Why it matters for Devs:</h2>
          <ul>
            <li>Understand your environment before you deploy.</li>
            <li>Anticipate your opponent (or your bugs).</li>
            <li>Complexity can be defeated by simple, elegant design.</li>
          </ul>

          <blockquote>"Fortune favors the bold, but strategy favors the prepared."</blockquote>
        `.trim(),
        createdAt: new Date('2025-11-20T14:30:00Z'),
        updatedAt: new Date('2025-11-20T14:30:00Z')
      },
      {
        title: 'TypeScript Naming Conventions',
        slug: 'typescript-naming-tips',
        imageUrl: '/images/cover-5.jpg',
        content: `
          <h2>Clean Code in 2026</h2>
          <p>Naming things is one of the hardest parts of development. In <strong>TypeScript</strong>, we aim for clarity over brevity.</p>

          <p>Consider these best practices for your Next.js projects:</p>
          <p><code>interface UserProfileProps {
            id: string;
            isActive: boolean;
          }</code></p>
          <p>Using descriptive names for your <em>Server Actions</em> and <em>Context Providers</em> makes your future self much happier during debugging sessions.</p>
        `.trim(),
        createdAt: new Date('2026-03-10T09:00:00Z'),
        updatedAt: new Date('2026-03-12T16:45:00Z')
      },
      {
        title: 'The Future of Strategy Gaming',
        slug: 'strategy-gaming-future',
        imageUrl: '/images/cover-6.jpg',
        content: `
          <h2>Beyond the Tutorial</h2>
          <p>Modern strategy games are moving away from linear tutorials. Players want to dive straight into the <strong>core gameplay loop</strong> and learn through action rather than guided hand-holding.</p>

          <p>Key trends we are seeing:</p>
          <ul>
            <li>Dynamic AI that adapts to your playstyle.</li>
            <li>Procedural world-building that rewards exploration.</li>
            <li>Smarter resource management systems.</li>
          </ul>

          <p>Whether you're managing a digital empire or a database cluster, the principles of resource allocation remain the same!</p>
        `.trim(),
        createdAt: new Date('2026-04-05T11:20:00Z'),
        updatedAt: new Date('2026-04-05T11:20:00Z')
      }
    ]

    console.log('Inserting HTML posts into Neon...')
    for (const post of posts) {
      const minifiedContent = await minify(post.content, {
        collapseWhitespace: true,
        removeComments: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true
      })

      await prisma.post.create({
        data: {
          ...post,
          content: minifiedContent
        }
      })
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
