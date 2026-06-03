import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const required = [
  'MONGODB_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'ADMIN_SESSION_SECRET',
];

const results = [];

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
  const mark = ok ? 'OK' : 'FAIL';
  console.log(`[${mark}] ${name}${detail ? ` — ${detail}` : ''}`);
}

for (const key of required) {
  const value = process.env[key];
  record(`env:${key}`, Boolean(value && String(value).trim()), value ? 'set' : 'missing or empty');
}

async function testCloudinary() {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const ping = await cloudinary.api.ping();
    record('cloudinary:api.ping', ping?.status === 'ok', `status=${ping?.status}`);
  } catch (error) {
    record('cloudinary:api.ping', false, error.message);
  }
}

async function testMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
    const dbName = mongoose.connection.db.databaseName;
    const collections = await mongoose.connection.db.listCollections().toArray();
    record('mongodb:connect', true, `database="${dbName}", collections=${collections.length}`);
    await mongoose.disconnect();
  } catch (error) {
    record('mongodb:connect', false, error.message);
  }
}

await testCloudinary();
await testMongo();

const failed = results.filter((item) => !item.ok);
process.exit(failed.length ? 1 : 0);
