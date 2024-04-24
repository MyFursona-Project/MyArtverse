import { LuCat as CatIcon, LuPin, LuPalette as Palette } from "react-icons/lu"
import type { ColorPalette as Colors } from "@/types/characters"
import { Button } from "../Buttons"
import MFImage from "../MFImage"
import ColorPalette from "./ColorPalette"

export default function PinnedCharacter({
  avatar,
  name,
  species,
  colors,
  artist,
  refSheetImg
}: {
  avatar: string
  name: string
  species: string
  colors: Colors[]
  artist: string
  refSheetImg: string
}) {
  return (
    <section className="border-300 mb-5 flex flex-row justify-between rounded border-4 border-solid p-4">
      <div className="flex w-full flex-col">
        <span className="mb-2 flex flex-row items-center">
          <LuPin className={"mr-2"} size={18} />
          Pinned Character
        </span>
        <div className="flex flex-col justify-between">
          <div className="flex flex-row ">
            <MFImage width={118} height={118} src={avatar} alt={`${name}'s avatar`} />
            <div className="m-4 flex flex-col">
              <h2 className="text-3xl">{name}</h2>
              <span className="text-lg">{species}</span>
              <ColorPalette palette={colors} />
            </div>
          </div>
          <div className="mt-4 flex flex-row space-x-3">
            <Button variant="primary" prefixIcon={<CatIcon size={19} />}>
              View character details
            </Button>
            <Button variant="primary" prefixIcon={<Palette size={19} />}>
              Export ref sheet
            </Button>
          </div>
        </div>
        <div className="mt-auto">
          <h4 className="not-prose text-subtext text-sm">ARTIST CREDIT</h4>
          <span>{artist}</span>
        </div>
      </div>
      <div className=" w-full">
        <MFImage
          rounded={12}
          width={640}
          height={360}
          src={refSheetImg}
          alt={`${name}'s ref sheet`}
        />
      </div>
    </section>
  )
}
