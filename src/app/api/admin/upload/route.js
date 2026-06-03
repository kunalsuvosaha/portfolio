import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getOptimizedCloudinaryUrl, uploadImageBuffer } from '@/lib/cloudinary';
import { validateImageFile } from '@/lib/media-utils';

const folderByType = {
  profile: 'portfolio/profile',
  project: 'portfolio/projects',
  education: 'portfolio/education',
  hero: 'portfolio/hero',
};

export async function POST(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = String(formData.get('type') || 'project');
    const validationError = validateImageFile(file);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadImageBuffer(buffer, {
      folder: folderByType[type] || 'portfolio/uploads',
    });

    return NextResponse.json({
      image: {
        url: getOptimizedCloudinaryUrl(upload.secure_url),
        rawUrl: upload.secure_url,
        publicId: upload.public_id,
        width: upload.width,
        height: upload.height,
        format: upload.format,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to upload image.' }, { status: 500 });
  }
}
