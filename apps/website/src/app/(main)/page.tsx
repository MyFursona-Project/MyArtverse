import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { config } from "@/constants"
import { fetchUserData } from "@/utils/api"
import { BRAND } from "@mav-internal/config"

const title = `${BRAND} — a place where everyfur belongs!`
const description = config.description

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description: description,
  openGraph: {
    title: title,
    siteName: BRAND,
    description: description
  }
}

export default async function Home() {
  const user = await fetchUserData().catch(() => {})
  if (user) redirect("/browse")

  return (
    <>
      <div className="w-full p-8">
        <div className="border-separator  rounded-md border border-dashed px-6 py-20 text-center text-lg">
          Front page needs a redesign, this is only temporary
        </div>
      </div>
    </>
  )
}
