import type { Config } from "tailwindcss"
import myfursonaPreset from "@mav-internal/config/tailwind.config"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../node_modules/@mav/ui/src/**/*.{ts,tsx}"
  ],
  presets: [myfursonaPreset]
} satisfies Config
