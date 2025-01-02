import type { PropsWithChildren } from "react"
import { StudioLayout } from "@/components/layouts/StudioLayout/StudioLayout"

export default function StudioRootLayout({ children }: PropsWithChildren) {
  return <StudioLayout>{children}</StudioLayout>
}
