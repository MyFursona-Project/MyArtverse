import { useId } from "react"
import { kebabCase } from "lodash"

/**
 * Used for targetting accessibility tools
 */
export const useMemoizeA11yLabel = (propName?: string) => {
  const _id = useId()
  const kebabedPropName = kebabCase(propName)

  return `${kebabedPropName || "field"}-${_id}`
}
