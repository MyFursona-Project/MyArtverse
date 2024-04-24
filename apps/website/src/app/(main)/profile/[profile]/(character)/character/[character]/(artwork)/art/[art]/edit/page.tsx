import Image from "next/image"
import { redirect } from "next/navigation"
import { fetchUserData, getArtwork } from "@/utils/api"
import ArtEditForm from "./ArtEditForm"

export default async function ArtPage({ params }) {
  const { profile, character, art } = params
  const artwork = await getArtwork(art)
  const user = await fetchUserData().catch(() => null)

  if (artwork.owner.id !== user.id)
    return redirect(`/profile/${profile}/character/${character}/art/${art}`)

  return (
    <div className="flex w-full flex-row justify-between space-x-5 px-12 py-5">
      <Image
        src={artwork.artworkUrl}
        alt={artwork.altText}
        width={1000}
        height={1000}
        className="mx-auto"
      />
      <ArtEditForm artwork={artwork} />
    </div>
  )
}
