import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropostaImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

function isRemoteOrDataUrl(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  );
}

export function PropostaImage({ src, alt, className, fill, priority }: PropostaImageProps) {
  if (isRemoteOrDataUrl(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(fill && "absolute inset-0 h-full w-full", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      unoptimized
    />
  );
}
