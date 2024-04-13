import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"
import type { Artwork, Character, CharacterResponse } from "@/types/characters"
import type { UserType } from "@/types/users"
import { BACKEND_URL } from "./env"

type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

const endpoint = BACKEND_URL

export const getCookies = async () => {
  const cookiesHeaders = cookies()
  return new Promise((resolve) => {
    resolve(cookiesHeaders)
  })
}

export const apiWithAuth = async <Data>(
  method: APIMethods,
  route: string
): Promise<Data> => {
  const makeRequest = async () => {
    const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies

    const accessToken = cookiesHeaders.get("accessToken").value
    const refreshToken = cookiesHeaders.get("refreshToken").value

    return fetch(`${endpoint}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      cache: "no-cache",
      credentials: "include"
    })
  }

  return makeRequest()
    .then((res) => {
      if (res.ok) return res.json()
      if (res.status === 401) {
        return refreshToken().then((refreshed) => {
          if (!refreshed) throw new Error("Unauthorized")

          return makeRequest().then((res) => {
            if (!res.ok) throw new Error("Unable to provide data")
            return res.json()
          })
        })
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const apiWithoutAuth = async <Data>(
  method: APIMethods,
  route: string,
  body?: object
): Promise<Data> => {
  return fetch(`${endpoint}${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-cache",
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error(`Unable to provide data ${res.status}`)
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const refreshToken = async () => {
  const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies
  if (!cookiesHeaders.has("refreshToken")) {
    return Promise.resolve(false)
  }

  const refreshToken = cookiesHeaders.get("refreshToken").value
  return fetch(`${endpoint}/v1/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`
    },
    body: JSON.stringify({}),
    credentials: "include",
    cache: "no-cache"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      return true
    })
    .catch(() => {
      return false
    })
}

export const fetchUserData = async () => {
  const data = await apiWithAuth<UserType>("GET", `/v1/profile/me`)
  return data
}

export const fetchUser = async (handle: string) => {
  const data = await apiWithoutAuth<UserType>("GET", `/v1/profile/${handle}`)
  return data
}

export const fetchUserCharacters = async (handle: string) => {
  const data = await apiWithoutAuth<CharacterResponse>("GET", `/v1/character/${handle}`)
  return data
}

export const fetchSelfCharacters = async () => {
  const characters = await apiWithAuth<Character[]>("GET", "/v1/character/")
  return characters
}

export const fetchSelfCharacter = async (characterName: string) => {
  const character = await apiWithAuth<Character>(
    "GET",
    `/v1/character/me/${characterName}`
  )

  return character
}

export const fetchCharacter = async (handle: string, characterName: string) => {
  const character = await apiWithoutAuth<Character>(
    "GET",
    `/v1/character/name/${handle}/${characterName}`
  )

  return character
}

export const getArtworks = async (profile: string, character: string) => {
  const artworks = await apiWithoutAuth<Artwork[]>(
    "GET",
    `/v1/art/characters/${profile}/${character}`
  )

  return artworks
}

export const getFeatured = async () => {
  const characters = await apiWithoutAuth<Character[]>("GET", "/v1/character/featured")
  return characters
}

export const getNewCharacters = async () => {
  const characters = await apiWithoutAuth<Character[]>("GET", "/v1/character/new")
  return characters
}

export const getFavorites = async (handle: string) => {
  const characters = await apiWithoutAuth<Character[]>(
    "GET",
    `/v1/profile/favorites/${handle}`
  )

  return characters
}

export const getArtwork = async (artworkId) => {
  const artwork = await apiWithoutAuth<Artwork>("GET", `/v1/art/${artworkId}`)
  return artwork
}

export const setRefAsMain = async (refId: string) => {
  await apiWithAuth("PUT", `/v1/character/assign-ref/${refId}`)
}
