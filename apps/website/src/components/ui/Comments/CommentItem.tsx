import { LuFlag, LuHeart, LuReply, LuThumbsUp } from "react-icons/lu"
import { Button } from "../Buttons"
import CommentWrapper from "./Wrapper"

export default function CommentItem({
  avatar,
  username,
  children,
  nestLevel
}: React.ComponentProps<typeof CommentWrapper> & { nestLevel?: number }) {
  return (
    <>
      <CommentWrapper avatar={avatar} username={username} className="bg-100 p-3 ">
        <div id="comment-contents" className="my-0.5">
          {children}
        </div>
        <div className="flex -translate-x-2 items-center gap-x-4">
          <span className="p-2 text-[0.85rem]">Reply</span>
          <LuHeart size={18} />
          <LuFlag size={18} />
        </div>
      </CommentWrapper>
    </>
  )
}
