"use client"

import cn from "@/utils/cn"
import Author from "../Author"
import { Avatar } from "../Buttons"

/** This is an internal wrapper for namespaced `<Comment />` components, don't use it anywhere else! */
export default function CommentWrapper({
  children,
  avatar,
  username,
  noAuthor,
  roles,
  className,
  commentType,
  artworkId,
  characterName
}: Readonly<
  Partial<
    {
      children: React.ReactNode
      avatar: string
      username: string
      noAuthor: boolean
      className?: string
      commentType: "profile" | "post" | "character" | "art"
      artworkId: string
      characterName: string
    } & React.ComponentProps<typeof Author>
  >
>) {
  return (
    <div className={"flex items-start gap-x-4"}>
      <div className="flex-shrink-0">
        <Avatar size={40} src={avatar ?? "/img/examples/kuro/kuro-example4.png"} />
      </div>
      <div className={cn("flex w-full flex-col gap-y-1", className)}>
        {!noAuthor ? <Author username={username} roles={roles} /> : null}
        {children}
      </div>
    </div>
  )
}
