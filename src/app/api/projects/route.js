import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { serializeProject } from '@/lib/project-utils';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({ disabled: false }).sort({ rank: 1 }).lean();
    return NextResponse.json({ projects: projects.map(serializeProject) });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to load projects.' }, { status: 500 });
  }
}
