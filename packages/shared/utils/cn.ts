import { twMerge } from "tailwind-merge"

export const cn = (...className: (string | unknown)[]) => {
  return twMerge(className.filter(Boolean).join(" "))
}
