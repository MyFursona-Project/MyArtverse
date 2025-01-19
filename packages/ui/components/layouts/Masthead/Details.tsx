"use client"

import { type ElementRef, type PropsWithChildren, useEffect, useRef } from "react"

interface MastheadDetailsProps {
  peekToggler?: () => unknown
}

export function MastheadDetails(props: PropsWithChildren<MastheadDetailsProps>) {
  const detailWrapperRef = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    const profileDetails = detailWrapperRef.current!

    const io = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting)
      },
      { rootMargin: "-7% 0%" }
    )

    io.observe(profileDetails)
  }, [])
  return (
    <section
      ref={detailWrapperRef}
      className="flex w-full flex-col gap-y-2.5
                 [&_[data-mh-layer]]:flex [&_[data-mh-layer]]:flex-wrap [&_[data-mh-layer]]:items-center"
    >
      {props.children}
    </section>
  )
}
