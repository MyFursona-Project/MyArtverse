import type {
  PickUnion,
  Variants as NoteVariants,
  PartialRecord
} from "@/types"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LucideIcon,
  XCircleIcon
} from "lucide-react"

type NoteStatus = PickUnion<
  NoteVariants,
  "success" | "warning" | "error" | "info"
>

export default function Note({
  children,
  type,
  heading,
  inline
}: {
  children?: React.ReactNode
  type: NoteStatus
  heading?: string
  inline?: boolean
}) {
  if (inline && heading) {
    throw new Error(
      "Can't use both `inline` and `heading` at the same time. Pass the message inside the element instead, otherwise, remove the `inline` prop."
    )
  }

  const status: PartialRecord<
    NoteStatus,
    { css: string; icon: LucideIcon; iconColor: string }
  > = {
    warning: {
      icon: AlertTriangleIcon,
      css: "border-warning",
      iconColor: "text-warning"
    },
    error: {
      icon: XCircleIcon,
      css: "border-error",
      iconColor: "text-error"
    },
    success: {
      icon: CheckCircle2Icon,
      css: "border-success",
      iconColor: "text-success"
    },
    info: {
      icon: InfoIcon,
      css: "border-info",
      iconColor: "text-info"
    }
  }

  const statusStyles = status[type]?.css
  const statusIconColor = status[type]?.iconColor
  const StatusIcon = status[type]?.icon as LucideIcon

  return (
    <div
      data-bui-note=""
      className={
        !inline
          ? `flex gap-1.5 px-3.5 py-3 border rounded-md ${statusStyles}`
          : `inline-flex gap-2 ${statusStyles}`
      }
    >
      <StatusIcon size={!inline ? 25 : 19} className={statusIconColor} />
      <div className={!inline ? "flex flex-col justify-center" : null}>
        {heading && (
          <div className="text-xl font-bold font-inter -translate-y-0.5">
            {heading}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
