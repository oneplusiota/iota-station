import { NextResponse } from 'next/server';
import { fetchProjects } from '@/src/utils/github-utils';

export async function GET() {
  try {
    const projects = await fetchProjects();

    return NextResponse.json({ results: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
