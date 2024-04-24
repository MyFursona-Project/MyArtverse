import type { Metadata } from "next"
import { fetchCharacter, fetchUser } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import type { SlugRouteProps } from "@/types/utils"
import DynamicLayout from "../../../DynamicLayout"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  const userHandleParam = params.profile

  return {
    title: {
      template: `%s (@${userHandleParam}) - MyFursona`,
      default: "Profile layout"
    },
    description: `Follow @${userHandleParam} on ${BRAND} by creating an account!`
  }
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
} & SlugRouteProps<{ profile: string; character: string }>) {
  const { character, profile } = params

  const userData = await fetchUser(profile)
  const characterData = await fetchCharacter(profile, character)
  if (character && !characterData) return null

  return (
    <>
      {/* TODO: Remove all props to be retrieved directly from Jotai or react-query */}
      <DynamicLayout profile={userData} character={characterData} />
      <div>{children}</div>
    </>
  )
}
