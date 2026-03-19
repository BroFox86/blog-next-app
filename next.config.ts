import { join } from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(process.cwd(), 'styles')],
    prependData: `@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;`
  }
}

export default nextConfig
