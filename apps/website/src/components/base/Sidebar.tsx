"use client"

/* eslint-disable import/no-internal-modules */
import Link from "next/link"
import { Fragment, useCallback, useEffect } from "react"
import { sidebarToggle } from "@/atoms"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { FaPallet } from "react-icons/fa6"
import {
  LuAlertTriangle as AlertTriangleIcon,
  LuBox as BoxIcon,
  LuBrush as BrushIcon,
  LuHelpCircle as HelpCircleIcon,
  LuHome as HomeIcon,
  LuCat,
  LuHistory,
  LuPalette,
  LuMessageSquarePlus as MessageSquarePlusIcon,
  LuSettings as SettingsIcon,
  LuSparkles as SparklesIcon,
  LuX as XIcon
} from "react-icons/lu"
import { SiCanva } from "react-icons/si"
import type { UserType } from "@/types/users"
import { MyFursonaIcon } from "../icons"
import { Avatar, Button } from "../ui/Buttons"
import Menu from "../ui/Menu"
import Overlay from "../ui/Modal/Overlay"
import Separator from "../ui/Separator"

export default function Sidebar({ user }: { user: UserType }) {
  const SIDEBAR_ITEMS_SIGNED_OUT = [
    {
      heading: "",
      items: [{ name: "Home", icon: <HomeIcon size={20} />, href: "/" }]
    },
    {
      heading: "Explore",
      items: [
        {
          name: "Available Adoptables",
          icon: <SparklesIcon size={20} />,
          href: "/adoptables"
        },
        {
          name: "Open for Commissions",
          icon: <BrushIcon size={20} />,
          href: "/commissions"
        }
        // TODO: 3D Models Coming Soon
        // { name: "3D Models", icon: BoxIcon, href: "/3d-models" }
      ]
    },
    {
      heading: "",
      items: [
        // { name: "Settings",   icon: <SettingsIcon size={20} />, href: "/settings" },
        { name: "Help", icon: <HelpCircleIcon size={20} />, href: "/help" },
        {
          name: "Send feedback",
          icon: <MessageSquarePlusIcon size={20} />,
          href: "/feedback"
        },
        { name: "Report Issue", icon: <AlertTriangleIcon size={20} />, href: "/report" }
      ]
    }
  ]

  const SIDEBAR_ITEMS_SIGNED_IN = [
    {
      heading: "",
      items: [{ name: "Home", icon: <HomeIcon size={20} />, href: "/" }]
    },
    {
      heading: "Activity",
      items: [
        { name: "History", icon: <LuHistory size={20} />, href: "/history" },
        {
          name: "Your Comissions",
          icon: <LuPalette size={20} />,
          href: `/activity/commissions`
        },
        {
          name: "Your Adopts",
          icon: <SparklesIcon size={20} />,
          href: `/activity/adoptables`
        }
      ]
    },
    {
      heading: "Your Characters",
      items: user
        ? user.characters.map((character) => ({
            name: character.name,
            icon: character.avatarUrl ? (
              <Avatar src={character.avatarUrl} />
            ) : (
              <LuCat size={20} />
            ),
            href: `/@${user.handle}/character/${character.name}`
          }))
        : []
    },
    {
      heading: "Explore",
      items: [
        {
          name: "Available Adoptables",
          icon: <SparklesIcon size={20} />,
          href: "/adoptables"
        },
        {
          name: "Open for Commissions",
          icon: <BrushIcon size={20} />,
          href: "/commissions"
        }
        // TODO: 3D Models Coming Soon
        // { name: "3D Models", icon: BoxIcon, href: "/3d-models" }
      ]
    },
    {
      heading: "",
      items: [
        { name: "Settings", icon: <SettingsIcon size={20} />, href: "/settings" },
        { name: "Help", icon: <HelpCircleIcon size={20} />, href: "/help" },
        {
          name: "Send feedback",
          icon: <MessageSquarePlusIcon size={20} />,
          href: "/feedback"
        },
        { name: "Report Issue", icon: <AlertTriangleIcon size={20} />, href: "/report" }
      ]
    }
  ]

  const SIDEBAR_ITEMS = user ? SIDEBAR_ITEMS_SIGNED_IN : SIDEBAR_ITEMS_SIGNED_OUT

  const [isSidebarOpen, setSidebarState] = useAtom(sidebarToggle)

  const toggleSidebar = useCallback(
    () => setSidebarState(!isSidebarOpen),
    [setSidebarState, isSidebarOpen]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSidebarOpen && e.key === "Escape") toggleSidebar()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, isSidebarOpen])

  const fmDuration = {
    duration: 0.2
  }

  return (
    <Overlay state={isSidebarOpen} toggler={toggleSidebar}>
      <motion.div
        className="bg-context-menu fixed inset-0 right-[unset] flex w-full flex-col ease-out md:w-[325px]"
        initial={{ x: "-100%", display: "none" }}
        animate={
          isSidebarOpen
            ? {
                x: 0,
                display: "block",
                transition: { ...fmDuration, ease: "easeOut" }
              }
            : {
                x: "-100%",
                transition: { ...fmDuration, ease: "easeIn" },
                transitionEnd: { display: "none" }
              }
        }
      >
        <div className="flex w-full items-center gap-x-2.5 px-5 py-4">
          <Button variant="tritery" icon={<XIcon size={20} />} onClick={toggleSidebar} />
          <Link href="/" aria-label="Home" title="Home">
            <MyFursonaIcon />
          </Link>
        </div>
        <div className="h-full overflow-y-scroll px-2.5" role="menu">
          {SIDEBAR_ITEMS.map(({ heading, items }, index) => (
            <Fragment key={index}>
              <Menu heading={heading ?? undefined}>
                {items.map((item, index) => (
                  <Menu.Item
                    key={index}
                    name={item.name}
                    prefixIcon={item.icon}
                    href={item.href}
                  />
                ))}
              </Menu>
              <Separator dir="horizontal" padding="0.525rem" />
            </Fragment>
          ))}
        </div>
      </motion.div>
    </Overlay>
  )
}
