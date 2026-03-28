import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neoflow — AI & Automation by Neorealiti',
  description: 'AI-powered lead generation, CRM automation, and workflow intelligence — the automation branch of Neorealiti.',
}

export default function NeoflowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
