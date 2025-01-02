import { LuMoreVertical } from "react-icons/lu"
import { Button } from "./Button"
import type { ButtonProps } from "./Button.types"

export function MoreButton(props: Omit<Partial<ButtonProps>, "icon">) {
  return <Button {...props} icon={<LuMoreVertical size={21} />} />
}
