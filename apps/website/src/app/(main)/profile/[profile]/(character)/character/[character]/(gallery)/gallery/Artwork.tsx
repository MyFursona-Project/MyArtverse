"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import type { Artwork } from "@/types/characters"

export default function Artwork({
  image,
  characterName
}: {
  image: Artwork
  characterName: string
}) {
  const { artworkUrl, title } = image
  const router = useRouter()
  return (
    <div className="relative w-1/4">
      <Image
        onClick={() =>
          router.push(
            `/@${image.owner.handle}/character/${characterName}/art/${image.id}`
          )
        }
        src={artworkUrl}
        alt={title}
        layout="responsive"
        width={100}
        height={100}
        className="rounded-lg"
      />
    </div>
  )
}
