import Image from "next/image";

type BackgroundImageProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
};

export default function BackgroundImage({
  src,
  alt = "",
  priority = false,
  className = "",
}: BackgroundImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
