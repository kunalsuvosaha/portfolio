import Image from 'next/image';
import { isNextImageHost } from '@/lib/remote-image';

export default function RemoteImage({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
  fill = true,
}) {
  if (!src) return null;

  if (isNextImageHost(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
