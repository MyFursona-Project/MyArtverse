"use client"

// import ReactQuill from "react-quill"
import { useState } from "react"
import { BACKEND_URL } from "@/utils/env"
import { Button } from "../Buttons"
import { InputField } from "../Forms"
import CommentWrapper from "./Wrapper"

export default function CommentField({
  avatar,
  username,
  commentType,
  artworkId,
  characterName
}: Omit<React.ComponentProps<typeof CommentWrapper>, "children">) {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const post = (content: string) => {
    fetch(
      `${BACKEND_URL}/v1/${commentType}/${artworkId ? artworkId : username}${characterName ? `/${characterName}` : ""}/comment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: content
        })
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment")
        window.location.reload()
      })
      .catch((err) => {
        setError(err.message)
        return
      })
    setContent("")
  }
  // const quillModules = {
  //   toolbar: [["bold", "italic", "underline", "strike", "blockquote"]]
  // }

  // // prettier-ignore
  // /* eslint-disable @stylistic/array-element-newline */
  // const quillFormats = [
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]

  return (
    <CommentWrapper noAuthor avatar={avatar} username={username}>
      {/* <ReactQuill
        className="font-open-sans w-full"
        modules={quillModules}
        formats={quillFormats}
        placeholder="Say something"
      /> */}
      <InputField
        placeholder="Say something"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <span className="text-red-500">{error}</span>}
      <Button className="mt-2 self-end" size="small" onClick={() => post(content)}>
        Post
      </Button>
    </CommentWrapper>
  )
}
