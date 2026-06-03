import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json({ settings: settings || {} });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to load site settings.' }, { status: 500 });
  }
}
