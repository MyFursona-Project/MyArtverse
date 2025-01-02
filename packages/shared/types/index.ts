import type React from "react"

export type Variants = "primary" | "secondary" | "tritery" | "success" | "warning" | "alert" | "info"

type IntrinsicElements = React.JSX.IntrinsicElements

export type ReactHTMLElement<T extends keyof IntrinsicElements> = IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, unknown> ? P : IntrinsicElements[T]
