import Image from "next/image"

import type { AdoptionStatus, ColorPalette as Palette } from "@/types"
import ColorPalette from "./ColorPalette"

type CharacterCardPalette =
  | [Palette]
  | [Palette, Palette]
  | [Palette, Palette, Palette]

export default function FursonaCard({
  name,
  img = "",
  species,
  isHybrid,
  palette,
  status = "notForAdopt",
  ...attributes
}: {
  name: string
  img?: string
  species?: string
  isHybrid?: boolean
  status?: AdoptionStatus
  palette?: CharacterCardPalette
} & Pick<React.HTMLAttributes<HTMLDivElement>, "role">) {
  return (
    <div
      tabIndex={0}
      aria-label={`Character item: ${name}, ${species}`}
      className="p-5 border border-400 bg-200 rounded-md grid gap-y-2"
      {...attributes}
    >
      <div className="overflow-hidden rounded-md">
        <div
          data-custom-img-renderer=""
          className="relative before:absolute before:-inset-0.5 before:z-[2]"
          style={
            {
              aspectRatio: "1/1",
              width: "100%"
            } as React.CSSProperties
          }
          draggable="false"
        >
          <Image
            className="select-none object-cover"
            alt={`Avatar of ${name}`}
            src={img}
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            quality="80"
            sizes="(max-width: 1280px) 400px"
            fill
          />
        </div>
        <ColorPalette
          width="100%"
          palette={[
            { color: "red", name: "" },
            { color: "blue", name: "" },
            { color: "green", name: "" }
          ]}
        />
      </div>
      <div className="grid">
        <h3 className="not-prose font-inter font-bold text-2xl">{name}</h3>
        <span>{species}</span>
      </div>
    </div>
  )
}
