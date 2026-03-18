import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FillFlow — AI & Automation by NeoRealiti',
  description: 'AI-powered lead generation, CRM automation, and workflow intelligence — the automation branch of NeoRealiti.',
}

export default function FillFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
