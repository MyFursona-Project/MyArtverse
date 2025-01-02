"use client"

import type { PropsWithChildren } from "react"
import { MotionConfig } from "framer-motion"

export function QueryClientWrapper({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
