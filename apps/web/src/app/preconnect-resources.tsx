"use client"

import ReactDOM from "react-dom"

const isDevelopment = process.env.NODE_ENV === "development"

export default function PreconnectResources() {
  ReactDOM.prefetchDNS("https://eu.umami.is/")

  // Preconnect resources from localhost during development
  const LOCALHOST_URL = "http://localhost" as const

  if (isDevelopment) {
    ReactDOM.prefetchDNS(`${LOCALHOST_URL}:8081`)

    ReactDOM.preload(`${LOCALHOST_URL}:8081`, {
      as: "fetch",
      fetchPriority: "high"
    })
    ReactDOM.preconnect(`${LOCALHOST_URL}:9000`)
  }

  return null
}
