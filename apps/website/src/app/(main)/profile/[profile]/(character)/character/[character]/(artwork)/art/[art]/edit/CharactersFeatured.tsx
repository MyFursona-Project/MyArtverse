"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { InputField } from "@/components/ui/Forms"
import { BACKEND_URL } from "@/utils/env"
import type { Artwork } from "@/types/characters"

export default function CharactersFeatured({ artwork }: { artwork: Artwork }) {
  const [charactersFeatured, setCharactersFeatured] = useState(artwork.charactersFeatured)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const router = useRouter()
  const path = usePathname()

  // const addCharacter = (e) => {
  //     // Fetch character from backend
  //     const char = fetch(`${BACKEND_URL}/v1/character/${e.currentTarget.value}`).then((res) => res.json()).catch((err) => console.error(err))
  //     if (!char) return setError('Character not found')

  const addCharacter = async (id: string) => {
    // Fetch character from backend
    if (charactersFeatured.find((char) => char.id === id))
      return setError("Character already added")
    const char = await fetch(`${BACKEND_URL}/v1/character/id/${id}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!char) return setError("Character not found")
    const updatedArtwork = await fetch(`${BACKEND_URL}/v1/art/${artwork.id}/${id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(char)
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!updatedArtwork) return setError("Failed to update artwork")
    setCharactersFeatured([...charactersFeatured, char])
    setSearchQuery("")
    setResults([])
    return updatedArtwork
  }

  const removeCharacter = async (id: string) => {
    // Fetch character from backend
    const char = await fetch(`${BACKEND_URL}/v1/character/id/${id}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!char) return setError("Character not found")
    const updatedArtwork = await fetch(
      `${BACKEND_URL}/v1/art/${artwork.id}/${id}/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(char)
      }
    )
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!updatedArtwork) return setError("Failed to update artwork")
    setCharactersFeatured(charactersFeatured.filter((char) => char.id !== id))
    return updatedArtwork
  }

  const deleteArtwork = async () => {
    // Delete artwork from backend
    const deletedArtwork = await fetch(`${BACKEND_URL}/v1/art/${artwork.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!deletedArtwork) return setError("Failed to delete artwork")
    return router.push(path.replace(`/art/${artwork.id}/edit`, `/gallery`))
  }

  return (
    <div>
      <InputField inputName="Featured Characters" />
      <div className="flex flex-row">
        {charactersFeatured.map((character) => (
          <div
            key={character.id}
            className="flex flex-row items-center border border-solid border-white px-3 py-2"
          >
            <Image
              src={character.avatarUrl}
              alt={character.name}
              width={30}
              height={30}
              className="mr-3 rounded-full"
            />
            <span>{character.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
