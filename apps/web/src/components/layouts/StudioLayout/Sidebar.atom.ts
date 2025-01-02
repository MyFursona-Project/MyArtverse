import { atom, useAtom } from "jotai"

const sidebarExpandStateAtom = atom<boolean>(true)

export const useSidebarOpenAtom = () => {
  const [sidebarState, setSidebarState] = useAtom(sidebarExpandStateAtom)

  return { sidebarState, setSidebarState }
}
