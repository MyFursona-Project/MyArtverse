import type { PropsWithChildren } from "react"

export function GroupContainer(props: PropsWithChildren) {
  return <div className="flex flex-col gap-y-6">{props.children}</div>
}
