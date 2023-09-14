import Link from "next/link"

import type {
  Sizes as ButtonSizes,
  Variants,
  OmitUnion,
  PartialRecord
} from "@/types"
import type { LucideIcon } from "lucide-react"
import type { UrlObject } from "url"

type ButtonVariants = OmitUnion<Variants, "success">
type ButtonVariantsRecord = PartialRecord<ButtonVariants>

type ButtonSizesRecord = PartialRecord<ButtonSizes>

export default function Button({
  children,
  iconOnly,
  disabled,
  type,
  variant,
  size,
  position,
  prefixIcon,
  suffixIcon,
  href,
  /**
   * Adding this property will override the `variant` and will ignore them
   * This is behavor intended for custom styling
   */
  className,
  ...attributes
}: {
  children?: React.ReactNode
  iconOnly?: boolean
  disabled?: boolean
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  variant?: ButtonVariants
  position?: "left" | "center" | "right"
  size?: ButtonSizes
  prefixIcon?: React.ReactElement<LucideIcon>
  suffixIcon?: React.ReactElement<LucideIcon>
  href?: string | UrlObject
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  | "onClick"
  | "onContextMenu"
  | "onKeyDown"
  | "onMouseDown"
  | "onMouseOver"
  | "aria-label"
  | "formAction"
  | "className"
  | "style"
>) {
  const sizes: ButtonSizesRecord = {
    small: !iconOnly ? "px-1.5 py-1" : "p-1.5",
    big: !iconOnly ? "px-4 py-2" : "p-2"
  }

  const baseStyles =
    "flex items-center gap-x-1.5 rounded-md transition-[border,background-color] border border-[2px]"

  const variants: ButtonVariantsRecord = {
    primary: "border-transparent bg-300 hover:bg-400 focus:bg-400",
    secondary:
      "bg-transparent border-300 hover:bg-400 hover:border-400 focus:border-400",
    tritery: "border-transparent bg-transparent hover:bg-400 focus:bg-400",
    warning: "border-transparent",
    error: "border-transparent"
  }

  const positions = {
    left: "text-left justify-start",
    center: "text-center justify-center",
    right: "text-right justify-end"
  }

  const sizeDynamic = sizes[size ?? "big"]
  const variantsDynamic = className ? className : variants[variant ?? "primary"]
  const positionDynamic = positions[position ?? "center"]

  const DynamicElement = !href ? "button" : Link

  const joinClasses = [
    baseStyles,
    sizeDynamic,
    variantsDynamic,
    positionDynamic
  ].join(" ")

  return (
    <DynamicElement
      data-biro-ui-variant={className ? "custom" : variant ?? "primary"}
      // @ts-ignore
      href={href ?? undefined}
      type={!href ? type ?? "button" : undefined}
      aria-disabled={disabled ?? undefined}
      className={className ? className : joinClasses}
      {...attributes}
    >
      {prefixIcon}
      {children && (
        <span className="inline-block overflow-hidden select-none whitespace-nowrap overflow-ellipsis">
          {children}
        </span>
      )}
      {suffixIcon}
    </DynamicElement>
  )
}
