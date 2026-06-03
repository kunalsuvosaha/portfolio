const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function validateImageFile(file) {
  if (!file) {
    return 'Image file is required.';
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Only JPEG, PNG, WebP, or GIF images are allowed.';
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return 'Image must be 5MB or smaller.';
  }

  return '';
}

export function imageAssetFromUpload(upload, alt = '') {
  return {
    url: upload.secure_url,
    publicId: upload.public_id,
    alt,
  };
}
