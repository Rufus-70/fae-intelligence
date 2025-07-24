'use client'

import BlogPostForm from '@/components/blog/BlogPostForm'
import { Container } from '@/components/layout/Container'

export default function CreateBlogPostPage() {
  return (
    <Container>
      <BlogPostForm mode="create" />
    </Container>
  )
}
