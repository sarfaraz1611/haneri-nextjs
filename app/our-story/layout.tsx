import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story | Haneri',
  description: 'Pioneering Innovation Since 1984 - Discover the legacy of excellence, innovation, and quality that defines Haneri.',
  keywords: ['Haneri', 'Our Story', 'About Us', 'Manufacturing', 'Innovation', 'Design', 'Legacy', 'Vision', 'Mission'],
  openGraph: {
    title: 'Our Story | Haneri',
    description: 'Pioneering Innovation Since 1984 - A Legacy of Excellence',
    type: 'website',
  },
}

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
