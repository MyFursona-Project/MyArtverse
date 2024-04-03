import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { fetchUser } from "@/utils/api"
import { BRAND } from "@mav-internal/config"
import type { SlugRouteProps } from "@/types/utils"
import DynamicLayout from "../DynamicLayout"

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
} & SlugRouteProps<{ profile: string }>) {
  const { profile } = params

  // Fetch user data from the API
  const userData = await fetchUser(profile)
  if (!userData) return null

  // if (!userData.displayName) return redirect("/onboarding/new-user")

  return (
    <>
      {/* TODO: Remove all props to be retrieved directly from Jotai or react-query */}
      <DynamicLayout profile={userData} character={null} />
      <div>{children}</div>
    </>
  )
}
