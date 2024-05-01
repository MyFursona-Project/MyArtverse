import Link from "next/link"
import React from "react"
import { Avatar } from "@/components/ui/Buttons"
import { LuUsers } from "react-icons/lu"

export default function ArtistCard({
  artistAvatarURL,
  artistDisplayName,
  artistHandle,
  followers,
  badges,
  loading
}) {
  return (
    <Link href={`/@${artistHandle}`}>
      <div className="bg-200 hover:bg-mute flex flex-col items-start p-5">
        {loading ? (
          <div className="bg-300 h-32 w-32 animate-pulse rounded-full" />
        ) : (
          <Avatar src={artistAvatarURL} size={250} />
        )}
        {loading ? (
          <div>
            <div className="bg-300 mt-2 h-4 w-32 animate-pulse rounded-md" />
            <div className="bg-300 mt-1 h-4 w-24 animate-pulse rounded-md" />
            <div className="bg-300 mt-1 h-4 w-24 animate-pulse rounded-md" />
          </div>
        ) : (
          <div className="mt-4">
            <span className="text-700 flex items-center text-2xl font-bold">
              {artistDisplayName} {badges}
            </span>
            <span className="text-lg">@{artistHandle}</span>
            <span className="flex items-center text-lg">
              <LuUsers size={20} className="mr-1" /> {followers} followers
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
