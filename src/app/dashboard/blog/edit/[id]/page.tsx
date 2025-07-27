// src/app/dashboard/blog/edit/[id]/page.tsx - Blog Edit Page
import BlogEditClient from '@/components/blog/BlogEditClient'

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return <BlogEditClient postId={id} />
}
