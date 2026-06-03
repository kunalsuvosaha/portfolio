export const REMOTE_IMAGE_HOSTNAMES = ['res.cloudinary.com', 'images.unsplash.com'];

export function getRemotePatterns() {
  return REMOTE_IMAGE_HOSTNAMES.map((hostname) => ({
    protocol: 'https',
    hostname,
  }));
}

export function isNextImageHost(src) {
  if (!src) return false;

  try {
    const { protocol, hostname } = new URL(src);
    return protocol === 'https:' && REMOTE_IMAGE_HOSTNAMES.includes(hostname);
  } catch {
    return false;
  }
}
