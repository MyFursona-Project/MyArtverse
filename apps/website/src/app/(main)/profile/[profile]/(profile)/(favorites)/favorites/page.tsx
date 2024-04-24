import type { Metadata, ResolvingMetadata } from "next"
import ShelfSection from "@/app/(main)/browse/ShelfSection"
import { GridResponsive, MarginClamp } from "@/components/ui"
import { FursonaCard } from "@/components/ui/Cards"
import { getFavorites } from "@/utils/api"
import { LuHeart } from "react-icons/lu"
import type { SlugRouteProps } from "@/types/utils"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Favorites`,
    description: `See User's favorites and more on MyFursona by creating an account!`
  }
}

export default async function FavoritesPage({ params }: SlugRouteProps) {
  const { profile } = params
  const favs = await getFavorites(profile)
  return (
    <MarginClamp>
      <div className="flex flex-row flex-wrap">
        {favs.map((character, index) => (
          <div key={index} className="w-1/4 p-2">
            <FursonaCard
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              palette={
                character.refSheets.length > 0 ? character.refSheets[0].colors : []
              }
              href={`/@${character.owner.handle}/character/${character.name}`}
            />
          </div>
        ))}
      </div>
    </MarginClamp>
  )
}
