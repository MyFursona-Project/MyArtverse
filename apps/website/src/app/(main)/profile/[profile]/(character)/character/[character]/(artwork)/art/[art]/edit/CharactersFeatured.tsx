"use client"

import Image from "next/image"
import { useState } from "react"
import { InputField } from "@/components/ui/Forms"
import { BACKEND_URL } from "@/utils/env"
import type { Artwork } from "@/types/characters"

export default function CharactersFeatured({ artwork }: { artwork: Artwork }) {
  const [charactersFeatured, setCharactersFeatured] = useState(artwork.charactersFeatured)
  const [error, setError] = useState("")

  // const addCharacter = (e) => {
  //     // Fetch character from backend
  //     const char = fetch(`${BACKEND_URL}/v1/character/${e.currentTarget.value}`).then((res) => res.json()).catch((err) => console.error(err))
  //     if (!char) return setError('Character not found')

  //     setCharactersFeatured([...charactersFeatured, char])
  // }

  return (
    <>
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
    </>
  )
}
