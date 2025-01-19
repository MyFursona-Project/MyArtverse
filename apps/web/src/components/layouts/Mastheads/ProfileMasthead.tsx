"use client"

import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import { LuCat, LuHeart, LuHome } from "react-icons/lu"

interface ProfileMastheadProps {
  bannerUrl: string
  avatarUrl: string
}

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  const profileTabs: MastheadTabItems = [
    {
      icon: LuHome,
      text: "Overview",
      link: ""
    },
    {
      icon: LuCat,
      text: "Characters",
      link: "/characters",
      countIndicator: 5
    },
    {
      icon: LuHeart,
      text: "Favorites",
      link: "/favorites"
    }
  ]

  return (
    <Masthead>
      <Masthead.Banner></Masthead.Banner>
      <Masthead.Wrapper>
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <div>username and badges</div>
            <div>buttons</div>
          </Masthead.Layer>
          <Masthead.Layer>following and others</Masthead.Layer>
          <Masthead.Layer>social links</Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs items={profileTabs} />
    </Masthead>
  )
}
