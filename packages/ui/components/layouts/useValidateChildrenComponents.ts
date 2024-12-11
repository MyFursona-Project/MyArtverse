"use client"

import {
  Children,
  type Component,
  type ElementType,
  type FC,
  type ReactElement,
  type ReactNode,
  isValidElement
} from "react"

// A hacky-fix for the missing `name` property
type ExtendElementType = ElementType & { name: string }

/**
 * A hook to validate one or more specified React components passed
 * through `children`
 *
 * @param childrenProp The `children` prop
 * @param allowedComponents An array of allowed components to be passed
 */
export function useValidateChildrenComponents<
  ValidChildren extends ReactNode,
  AllowedComponents extends FC | Component
>(childrenProp: ValidChildren, allowedComponents: AllowedComponents[]) {
  return Children.map(childrenProp, (child) => {
    const isValidChildElement = isValidElement(child)

    if (
      isValidChildElement ||
      allowedComponents.some((allowedType) => (child as ReactElement).type === allowedType)
    )
      return child

    const allowedNames = allowedComponents
      .map((type) => (type as ExtendElementType).name || type.toString())
      .join(", ")

    const invalidChildName = isValidChildElement && (child.type as ExtendElementType).name

    throw new Error(
      `Component '${invalidChildName}' is not allowed. The allowed components are: ${allowedNames}.`
    )
  })
}
