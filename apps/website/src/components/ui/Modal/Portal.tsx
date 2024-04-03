import { createPortal } from "react-dom"

export default function Portal({
  children,
  style
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return createPortal(
    <div id="myartverse-portal" style={style}>
      {children}
    </div>,
    document.body
  )
}
