import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface PropostaImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  style?: CSSProperties;
}

function isRemoteOrDataUrl(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  );
}

export function PropostaImage({ src, alt, className, fill, priority, style }: PropostaImageProps) {
  if (isRemoteOrDataUrl(src)) {
    return (
      <img
        src={src}
        alt={alt}
        style={style}
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
      style={style}
      unoptimized
    />
  );
}
