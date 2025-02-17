"use client"

import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CharacterItemSkeleton, CharacterTable } from "@/components/dashboard/Tables"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { LuFilter } from "react-icons/lu"
import type { Character } from "@/types/characters"
import CreateCharacterView from "./CreateCharacterModal"

const CharacterTableItem = dynamic(
  () => import("@/components/dashboard/Tables").then((c) => c.CharacterItem),
  { ssr: false, loading: CharacterItemSkeleton }
)

export default function CharacterView({ characters = [] }: { characters: Character[] }) {
  const queryParams = useSearchParams()
  const [createCharacterModal, setCreateCharacterModal] = useState(
    queryParams.has("createModal") || false
  )

  const toggleCreateCharacterModal = () => {
    setCreateCharacterModal(!createCharacterModal)
    return
  }

  return (
    <div className="w-full">
      <CreateCharacterView
        toggleCreateCharacterModal={toggleCreateCharacterModal}
        createCharacterModal={createCharacterModal}
      />
      {queryParams.has("error", "notFound") && (
        <div className="bg-error mx-1 my-3 flex w-1/2 flex-row items-center justify-between rounded-md p-3">
          Character you wanted to edit does not exist
        </div>
      )}
      <div className="after:border-mute relative flex items-center px-2 after:absolute after:inset-x-0 after:bottom-0 after:z-[3] after:h-[1px] after:border-b">
        <InputField
          noLabel
          inputName="Type to filter characters"
          placeholder="Filter characters"
          className="font-inter relative w-full rounded-none border-none py-3 pl-12 text-sm focus:outline-none focus:ring-0"
        />
        <Button
          variant="tritery"
          className="group absolute inset-y-1 left-3 z-[2] px-2.5 hover:bg-transparent"
          aria-label="Filter or sort items"
        >
          <LuFilter size={19} className="group-hover:stroke-500" />
        </Button>
      </div>
      <div className="w-full">
        {characters.length > 0 ? (
          <CharacterTable>
            {characters.map((character) => (
              <CharacterTableItem character={character} key={character.id} />
            ))}
          </CharacterTable>
        ) : (
          <div className="my-40 flex flex-col items-center justify-center">
            <p className="text-2xl">No one seem to be around</p>
            <p>
              Create a character or import from existing platforms from Toyhouse to get
              started! Learn more
            </p>
            <div className="my-4 flex flex-row space-x-4">
              <Button onClick={toggleCreateCharacterModal}>Create Character</Button>
              <Button>Import from Toyhouse</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
