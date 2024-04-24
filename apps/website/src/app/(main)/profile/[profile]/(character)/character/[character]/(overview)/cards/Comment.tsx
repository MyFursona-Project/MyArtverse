import React from "react"
import Comments from "@/components/ui/Comments"
import type { Character } from "@/types/characters"
import type { Comments as UserComments, UserType } from "@/types/users"

export default function Comment({
  user,
  character
}: {
  user: UserType
  character: Character
}) {
  return (
    user && (
      <div>
        <Comments>
          <Comments.Field
            avatar={user.avatarUrl}
            username={user.handle}
            handle={user.handle}
            commentType="character"
            characterName={character.name}
          />
          {character.comments
            ? character.comments.map((comment, index) => (
                <Comments.Item
                  key={index}
                  avatar={comment.author.avatarUrl}
                  username={comment.author.handle}
                >
                  {comment.content}
                </Comments.Item>
              ))
            : null}
        </Comments>
      </div>
    )
  )
}
