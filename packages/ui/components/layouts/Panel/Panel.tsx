import { mergeNamespaceComponents } from "@mav/shared/utils"
import { PanelContainer } from "./PanelContainer"
import { PanelPane } from "./PanelPane"

const Panel = mergeNamespaceComponents(PanelContainer, {
  Pane: PanelPane
})

export { Panel }
