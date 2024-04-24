import Image from "next/image"
import { redirect } from "next/navigation"
import { useState } from "react"
import { InputField, RichTextField } from "@/components/ui/Forms"
import { fetchUserData, getArtwork } from "@/utils/api"
import CharactersFeatured from "./CharactersFeatured"

export default async function ArtPage({ params }) {
  const { profile, character, art } = params
  const artwork = await getArtwork(art)
  const user = await fetchUserData().catch(() => null)

  if (artwork.owner.id !== user.id)
    return redirect(`/profile/${profile}/character/${character}/art/${art}`)

  return (
    // Create edit page for artwork
    <div className="flex w-full flex-row justify-between space-x-5 px-12 py-5">
      <Image
        src={artwork.artworkUrl}
        alt={artwork.altText}
        // Half image
        width={1000}
        height={1000}
        className="mx-auto"
      />
      <div className="w-1/2 space-y-8">
        <InputField inputName="Title" value={artwork.title} />
        <RichTextField inputName="Description" value={artwork.description} />
        <InputField inputName="Tags" value={artwork.tags} />
        <InputField inputName="Alt Text" value={artwork.altText} />
        {/* Only one option to add artist or artist url */}
        <InputField
          inputName="Artist"
          value={artwork.artist ? artwork.artist.handle : artwork.artistUrl}
        />
        {/* Featured Characters tagging */}
        <CharactersFeatured artwork={artwork} />
      </div>
    </div>
  )
}
