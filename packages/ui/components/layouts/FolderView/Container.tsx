import type { PropsWithChildren } from "react"

export function FolderViewContainer(props: PropsWithChildren) {
  return (
    <div data-fv-container="">
      <nav>breadcrumb nav visible for mobile users</nav>
      <div>{props.children}</div>
    </div>
  )
}
