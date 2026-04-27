import 'server-only'

import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from './generated/prisma/client'

// 1. Get your URL from the environment
const connectionString = process.env.DATABASE_URL!

// 2. Create the adapter directly with the string (Fixes the Pool error)
const adapter = new PrismaNeon({ connectionString })

// 3. Prevent multiple instances in development (Standard Next.js practice)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error']
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
