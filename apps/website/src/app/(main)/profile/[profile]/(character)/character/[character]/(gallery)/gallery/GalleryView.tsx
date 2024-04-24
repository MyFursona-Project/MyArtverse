import type { Metadata } from "next"
import Image from "next/image"
import { MarginClamp } from "@/components/ui"
import { getArtworks } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import Artwork from "./Artwork"

// TODO get user data from Jotai global store
export const metadata: Metadata = {
  title: `User's Gallery`,
  description: `See User's gallery on ${BRAND} by creating an account!`
}

export default async function GalleryView({ character, profile }) {
  const images = await getArtworks(profile, character)
  return (
    <MarginClamp>
      {images && (
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <Artwork image={image} key={index} characterName={character} />
          ))}
        </div>
      )}
    </MarginClamp>
  )
}
