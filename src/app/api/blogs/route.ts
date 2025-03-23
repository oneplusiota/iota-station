import { NextResponse } from 'next/server';
import { fetchBlogs } from '@/src/utils/github-utils';

export async function GET() {
  try {
    const blogs = await fetchBlogs();

    return NextResponse.json({ results: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
