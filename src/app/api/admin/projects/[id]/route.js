import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/admin-auth';
import { deleteCloudinaryAsset } from '@/lib/cloudinary';
import { normalizeProjectPayload, serializeProject, validateProjectPayload } from '@/lib/project-utils';
import Project from '@/models/Project';

export async function PATCH(request, context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = await context.params;
    const payload = normalizeProjectPayload(await request.json());
    const errors = validateProjectPayload(payload);

    if (Object.keys(errors).length) {
      return NextResponse.json({ error: 'Validation failed.', errors }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const existingRank = await Project.findOne({
      _id: { $ne: id },
      rank: payload.rank,
    }).lean();

    if (existingRank) {
      return NextResponse.json(
        { error: `Rank ${payload.rank} is already used by "${existingRank.title}". Change one rank first.`, errors: { rank: 'Rank must be unique.' } },
        { status: 409 }
      );
    }

    Object.assign(project, payload);
    await project.save();

    return NextResponse.json({ project: serializeProject(project) });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to update project.' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    if (deleted.imagePublicId) {
      await deleteCloudinaryAsset(deleted.imagePublicId);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to delete project.' }, { status: 500 });
  }
}
