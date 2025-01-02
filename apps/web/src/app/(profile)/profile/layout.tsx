import type { PropsWithChildren } from "react"
import AppLayout from "@/components/layouts/AppLayout/AppLayout"

export default function MainProfileLayout(props: PropsWithChildren) {
  return <AppLayout>{props.children}</AppLayout>
}
