import { cn } from "@myartverse/shared/utils"

interface FieldLabelProps {
  label: string
  isRequired: boolean
}

/**
 * @internal For internal use only on field-related components, do not import directly!
 */
export default function FieldLabel(props: Partial<FieldLabelProps>) {
  return (
    <span
      aria-hidden={true}
      className={cn(
        "text-700 flex gap-x-0.5 text-base font-bold empty:hidden",
        props.isRequired &&
          "after:text-error after:ml-1 after:font-bold after:content-['*']"
      )}
    >
      {props.label}
    </span>
  )
}
