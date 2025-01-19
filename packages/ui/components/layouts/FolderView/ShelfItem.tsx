"use client"

import { type PropsWithChildren, type ReactElement, useState } from "react"
import type { IconType } from "react-icons"

interface FolderViewShelfItemProps {
  type?: "default" | "nested" | "new"
  baseUrl?: string
  as?: "a" | "button"
  title: string
  prefix: IconType | ReactElement
}

export function FolderViewShelfItem(props: PropsWithChildren<FolderViewShelfItemProps>) {
  const DynamicElement = props.as || "button"

  return <DynamicElement></DynamicElement>
}
