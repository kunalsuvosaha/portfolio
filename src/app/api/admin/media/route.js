import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/admin-auth';
import { deleteCloudinaryAsset } from '@/lib/cloudinary';
import SiteSettings from '@/models/SiteSettings';

const allowedKeys = ['profileImage', 'heroBackgroundImage', 'schoolImage', 'bcaImage', 'mcaImage'];

async function getSettingsDocument() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const settings = await getSettingsDocument();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to load media settings.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { key, image } = await request.json();

    if (!allowedKeys.includes(key)) {
      return NextResponse.json({ error: 'Unknown media setting.' }, { status: 400 });
    }

    const settings = await getSettingsDocument();
    settings[key] = {
      url: image?.url || '',
      publicId: image?.publicId || '',
      alt: image?.alt || '',
    };
    await settings.save();

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to update media settings.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { key } = await request.json();

    if (!allowedKeys.includes(key)) {
      return NextResponse.json({ error: 'Unknown media setting.' }, { status: 400 });
    }

    const settings = await getSettingsDocument();
    const publicId = settings[key]?.publicId;

    if (publicId) {
      await deleteCloudinaryAsset(publicId);
    }

    settings[key] = { url: '', publicId: '', alt: '' };
    await settings.save();

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to delete media.' }, { status: 500 });
  }
}
