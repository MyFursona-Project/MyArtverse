"use client"

import { useState } from "react"
import { InputField, RichTextField } from "@/components/ui/Forms"
import cn from "@/utils/cn"
import type { Artwork } from "@/types/characters"
import CharactersFeatured from "./CharactersFeatured"
import UserMention from "./UserMention"

export default function ArtEditForm({ artwork }: { artwork: Artwork }) {
  const [title, setTitle] = useState(artwork.title)
  const [description, setDescription] = useState(artwork.description)
  const [tags, setTags] = useState(artwork.tags)
  const [altText, setAltText] = useState(artwork.altText)
  const [artist, setArtist] = useState(artwork.artist)
  const [artistUrl, setArtistUrl] = useState(artwork.artistUrl)
  const [artistType, setArtistType] = useState(artwork.artist ? "internal" : "external")

  return (
    <div className="w-1/2 space-y-8">
      <InputField inputName="Title" value={artwork.title} />
      <div className="bg-300 p-3">
        <div className="flex flex-row ">
          <span
            onClick={() => setArtistType("internal")}
            className={cn(
              "hover:bg-400 mb-4 h-full w-full p-4 text-center transition-all ease-in",
              artistType == "internal" && "bg-400"
            )}
          >
            Internal Artist
          </span>
          <span
            onClick={() => setArtistType("external")}
            className={cn(
              "hover:bg-400 mb-4 h-full w-full p-4 text-center transition-all ease-in",
              artistType == "external" && "bg-400"
            )}
          >
            External Artist
          </span>
        </div>

        {artistType == "internal" ? (
          <UserMention artworkId={artwork.id} artist={artist} />
        ) : (
          <div>
            <InputField inputName="Artist URL" value={artwork.artistUrl} />
            {/* TODO: Parse URL */}
          </div>
        )}
      </div>
      <RichTextField inputName="Description" value={artwork.description} />
      <InputField inputName="Tags" value={artwork.tags} />
      <InputField inputName="Alt Text" value={artwork.altText} />
      {/* Only one option to add artist or artist url */}

      {/* Featured Characters tagging */}
      <CharactersFeatured artwork={artwork} />
    </div>
  )
}
