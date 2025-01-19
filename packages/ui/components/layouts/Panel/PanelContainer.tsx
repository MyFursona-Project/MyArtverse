import type { PropsWithChildren } from "react"
import { useValidateChildrenComponents } from "../useValidateChildrenComponents"
import { PanelPane } from "./PanelPane"

export function PanelContainer(props: PropsWithChildren) {
  const paneChildrenOnly = useValidateChildrenComponents(props.children, [PanelPane])

  return <div className="flex">{paneChildrenOnly}</div>
}
