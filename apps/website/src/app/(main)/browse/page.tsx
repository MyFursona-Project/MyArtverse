import { MarginClamp } from "@/components/ui"
import { FursonaCard } from "@/components/ui/Cards"
import { getFeatured, getNewCharacters } from "@/utils/api"
import {
  LuBrush as Brush,
  LuHeart as Heart,
  LuLayers as Layers,
  LuSparkles as Sparkles
} from "react-icons/lu"
import type { Character, FursonaStatus } from "@/types/characters"
import ShelfSection from "./ShelfSection"

export default async function Browse() {
  const featuredCharacters = await getFeatured()
  const newCharacters = await getNewCharacters()
  return (
    <MarginClamp>
      <div className="mx-auto my-20 flex  flex-col justify-between gap-y-2 md:mt-8 md:flex-col">
        <ShelfSection icon={Heart} title={"Featured Characters"}>
          {featuredCharacters.map((character, index) => (
            <FursonaCard
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              palette={
                character.refSheets.length > 0 ? character.refSheets[0].colors : []
              }
              href={`/@${character.owner.handle}/character/${character.name}`}
              // likes={character.likes}
              key={index}
            />
          ))}
        </ShelfSection>
        <ShelfSection icon={Sparkles} title={"Recently created characters"}>
          {newCharacters.map((character, index) => (
            <FursonaCard
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              palette={
                character.refSheets.length > 0 ? character.refSheets[0].colors : []
              }
              href={`/@${character.owner.handle}/character/${character.name}`}
              // likes={character.likes}
              key={index}
            />
          ))}
        </ShelfSection>
        {/* TODO create profile card and collections card */}
        <div>
          <div className="my-3 flex flex-row">
            <span className="flex flex-row items-center justify-center text-2xl font-bold">
              <Brush width={26} height={26} className="mr-2" />
              Artists Open for Comissions
            </span>
            <hr />
            <div />
          </div>
        </div>
        <div className="my-3 flex flex-row">
          <span className="flex flex-row items-center justify-center text-2xl font-bold">
            <Layers width={26} height={26} className="mr-2" />
            Curated Collections
          </span>
          <hr />
          <div />
        </div>
      </div>
    </MarginClamp>
  )
}
