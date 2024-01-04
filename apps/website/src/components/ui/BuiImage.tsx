"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

type ImgLoadStrategy = "lazy" | "neutral" | "important"

export default function MFImage({
  src,
  alt,
  aspectRatio,
  height,
  width,
  sizes,
  strategy = "neutral",
  objectFit,
  rounded,
  style,
  ...attributes
}: {
  src: string
  aspectRatio?: string
  height?: string | number
  width?: string | number
  sizes?: any
  strategy?: ImgLoadStrategy
  objectFit?: React.CSSProperties["objectFit"]
  rounded?: boolean
} & Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "onClick" | "onContextMenu" | "style"
>) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const loadingStrategy: Record<
    ImgLoadStrategy,
    Pick<React.ImgHTMLAttributes<HTMLImageElement>, "fetchPriority"> & {
      priority: boolean
    }
  > = {
    lazy: {
      fetchPriority: "low",
      priority: false
    },
    neutral: {
      fetchPriority: "auto",
      priority: true
    },
    important: {
      fetchPriority: "high",
      priority: true
    }
  }

  const setStrategy = loadingStrategy[strategy]

  return (
    <div
      className="relative before:absolute before:inset-0 before:z-[2]"
      style={{
        aspectRatio,
        height,
        width,
        overflow: "hidden",
        borderRadius: !rounded ? 0 : 9999
      }}
      draggable="false"
      {...attributes}
    >
      <Image
        style={{
          userSelect: "none",
          objectFit,
          ...style
        }}
        fill
        src={src}
        alt={alt ?? ""}
        decoding="async"
        sizes={sizes}
        fetchPriority={setStrategy.fetchPriority}
        priority={setStrategy.priority}
        onLoad={() => setImgLoaded(true)}
      />
      <div
        id="loading-skeleton"
        className={clsx(
          "absolute inset-0 -z-[2] bg-red-500 animate-pulse",
          !imgLoaded ? "" : "hidden"
        )}
      />
    </div>
  )
}
