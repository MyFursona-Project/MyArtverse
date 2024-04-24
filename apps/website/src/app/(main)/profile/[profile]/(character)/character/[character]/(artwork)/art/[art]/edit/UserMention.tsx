"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Avatar, Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { BACKEND_URL } from "@/utils/env"
import type { UserType } from "@/types/users"

export default function UserMention({
  artworkId,
  artist
}: {
  artworkId: string
  artist?: UserType
}) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [selectedUser, setSelectedUser] = useState(artist)
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const path = usePathname()
  const router = useRouter()

  const handleChange = async (e) => {
    setSearchQuery(e.currentTarget.value)
    if (e.currentTarget.value.length < 3) return
    // Fetch users from backend
    const users = await fetch(
      `${BACKEND_URL}/v1/profile/search?query=${e.currentTarget.value}`
    )
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!users) return setError("Users not found")
    setResults(users)
    return users
  }

  const assignArtist = async (id: string) => {
    const e = await fetch(`${BACKEND_URL}/v1/art/${artworkId}/assign/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
    if (!e) return setError("Failed to assign artist")
    setSelectedUser(results.find((user) => user.id === id))
    setResults([])
    setSearchQuery("")
    return e
  }

  return (
    <div className="flex flex-col">
      <InputField
        inputName="Search Users"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Backspace" && setSelectedUser(null)}
        error={error}
      />
      {results.length > 0 && (
        <div className="bg-400 mt-2 flex w-full flex-col rounded-lg">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => assignArtist(user.id)}
              className="border-300 hover:bg-300 flex flex-row items-center border px-3 py-2 transition-all ease-in-out"
            >
              <Avatar src={user.avatarUrl || "/UserProfile.png"} />
              <span className="mx-4 text-xl">
                {user.displayName} (@{user.handle})
              </span>
            </div>
          ))}
        </div>
      )}
      {selectedUser && (
        <div className="items-left flex flex-col ">
          <span className="text-600 my-2">Selected User:</span>
          <div className="flex flex-row">
            <Avatar src={selectedUser.avatarUrl || "/UserProfile.png"} />
            <span className="mx-4 text-lg">
              {selectedUser.displayName} (@{selectedUser.handle})
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
