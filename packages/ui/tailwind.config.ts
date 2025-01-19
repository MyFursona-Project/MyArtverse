import type { Config } from "tailwindcss"
import twShared from "@mav/config/tailwind.config"

export default {
  content: ["/**/*.{ts,tsx}"],
  presets: [twShared]
} satisfies Config
