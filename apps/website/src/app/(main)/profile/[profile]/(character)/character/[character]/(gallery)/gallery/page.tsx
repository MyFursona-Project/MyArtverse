import type { Metadata } from "next"
import { BRAND } from "@myfursona-internal/config"
import GalleryView from "./GalleryView"

// TODO get user data from Jotai global store
export const metadata: Metadata = {
  title: `User's Gallery`,
  description: `See User's gallery on ${BRAND} by creating an account!`
}

export default function GalleryPage({ params }) {
  const { character, profile } = params
  return <GalleryView character={character} profile={profile} />
}
