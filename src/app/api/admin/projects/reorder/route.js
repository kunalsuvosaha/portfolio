import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/admin-auth';
import { serializeProject } from '@/lib/project-utils';
import Project from '@/models/Project';

export async function POST(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id, direction } = await request.json();

    if (!id || !['up', 'down'].includes(direction)) {
      return NextResponse.json({ error: 'Project id and direction are required.' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const neighbor = await Project.findOne(
      direction === 'up'
        ? { rank: { $lt: project.rank } }
        : { rank: { $gt: project.rank } }
    ).sort(direction === 'up' ? { rank: -1 } : { rank: 1 });

    if (!neighbor) {
      return NextResponse.json({ error: `Project is already at the ${direction === 'up' ? 'top' : 'bottom'}.` }, { status: 400 });
    }

    const currentRank = project.rank;
    const neighborRank = neighbor.rank;

    await Project.updateOne({ _id: project._id }, { $set: { rank: -1 } });
    await Project.updateOne({ _id: neighbor._id }, { $set: { rank: currentRank } });
    await Project.updateOne({ _id: project._id }, { $set: { rank: neighborRank } });

    const projects = await Project.find({}).sort({ rank: 1, createdAt: -1 }).lean();
    return NextResponse.json({ projects: projects.map(serializeProject) });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to reorder projects.' }, { status: 500 });
  }
}
