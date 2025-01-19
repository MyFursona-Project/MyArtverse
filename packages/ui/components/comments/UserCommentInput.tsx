import type { ComponentProps } from "react"
import { Button } from "../buttons"
import { CommentBase } from "./CommentBase"

interface CommentInputProps extends ComponentProps<typeof CommentBase> {
  disabled?: true | string
}

export function UserCommentInput(props: CommentInputProps) {
  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      outerContainer={
        <div className="mt-3 flex justify-end">
          <Button size="small">Comment</Button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-md font-normal">
        <textarea
          data-mav-comment-input=""
          className="h-auto w-full resize-none border-none p-3 text-sm"
          placeholder="Add a comment..."
        />
      </div>
    </CommentBase>
  )
}
