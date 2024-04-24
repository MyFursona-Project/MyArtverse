import dynamic from "next/dynamic"
import cn from "@/utils/cn"
import CommentSkeleton from "./CommentSkeleton"

const CommentField = dynamic(
  () => import("./CommentField")
)

const CommentItem = dynamic(
  () => import("./CommentItem"),
  { loading: CommentSkeleton, ssr: false }
)

function Comment({
  children,
  className
}: Readonly<{
  children?: React.ReactNode
  className?: string
}>) {
  return (
    <div
      id="comments-renderer"
      className={cn(
        `flex flex-col gap-y-3.5`,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Object.assign(Comment, {
  Field: CommentField,
  Item: CommentItem
})
