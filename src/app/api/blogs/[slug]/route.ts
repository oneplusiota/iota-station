import { NextResponse } from 'next/server';
import { fetchBlogBySlug } from '@/src/utils/github-utils';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await fetchBlogBySlug(params.slug);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      page: {
        id: blog.id,
        created_time: blog.created_time,
        properties: {
          "Name": {
            type: "title",
            title: [{ plain_text: blog.title || blog.slug, type: "text", annotations: {} }]
          },
          "Description": {
            type: "rich_text",
            rich_text: [{ plain_text: blog.description || "", type: "text", annotations: {} }]
          }
        },
        cover: blog.cover ? {
          type: "external",
          external: { url: blog.cover }
        } : null,
        icon: blog.icon ? { type: "emoji", emoji: blog.icon } : null
      },
      blocks: [],
      html: blog.html
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
