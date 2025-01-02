"use client"

import Link from "next/link"
import { Button } from "@mav/ui/components/buttons"
import { MyArtverseIcon } from "@mav/ui/icons"
import { LuSearch } from "react-icons/lu"
import { ActionsLoggedIn } from "./ActionsLoggedIn"
import { ActionsLoggedOut } from "./ActionsLoggedOut"

const __tmpIsUserLoggedIn = false

export function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="font-inter bg-100 relative flex select-none items-center justify-between px-5 py-3 text-sm font-medium">
        <Link href="/" aria-label="Home" draggable={false}>
          <MyArtverseIcon size={0.69} />
        </Link>
        <div className="flex items-center gap-x-2">
          <Button
            prefix={<LuSearch size={18} />}
            className="hover:!bg-100 w-64"
            variant="secondary"
          >
            Search
          </Button>
          {__tmpIsUserLoggedIn ? <ActionsLoggedIn /> : <ActionsLoggedOut />}
        </div>
      </nav>
    </div>
  )
}
