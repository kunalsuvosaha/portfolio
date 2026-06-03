import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/admin-auth';
import { normalizeProjectPayload, serializeProject, validateProjectPayload } from '@/lib/project-utils';
import Project from '@/models/Project';

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ rank: 1, createdAt: -1 }).lean();
    return NextResponse.json({ projects: projects.map(serializeProject) });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to load projects.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const payload = normalizeProjectPayload(await request.json());
    const errors = validateProjectPayload(payload);

    if (Object.keys(errors).length) {
      return NextResponse.json({ error: 'Validation failed.', errors }, { status: 400 });
    }

    const existingRank = await Project.findOne({ rank: payload.rank }).lean();
    if (existingRank) {
      return NextResponse.json(
        { error: `Rank ${payload.rank} is already used by "${existingRank.title}". Change one rank first.`, errors: { rank: 'Rank must be unique.' } },
        { status: 409 }
      );
    }

    const project = await Project.create(payload);
    return NextResponse.json({ project: serializeProject(project) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to create project.' }, { status: 500 });
  }
}
