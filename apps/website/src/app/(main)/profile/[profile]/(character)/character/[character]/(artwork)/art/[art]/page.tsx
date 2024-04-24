import type { Metadata } from "next"
import { MFImage, Note, Separator } from "@/components/ui"
import { Avatar, Button } from "@/components/ui/Buttons"
import Comments from "@/components/ui/Comments"
import { fetchUser, fetchUserData, getArtwork } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import type { UserType } from "@/types/users"
import ArtworkDetails from "./ArtworkDetails"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: `Art title by Artist | ${BRAND}`
    },
    description: `Art description`
  }
}

export default async function ArtPage({ params }) {
  const artwork = await getArtwork(params.art)
  console.log(artwork)
  const user = (await fetchUserData().catch(() => null)) as UserType | null
  return (
    <div className="flex">
      {/* Artwork image, details, and comments */}
      <div className="flex w-full flex-col">
        <div className="bg-100 relative h-[75dvh] select-none">
          <div
            className="absolute inset-x-12 inset-y-0 z-10"
            data-trigger-zoom-modal=""
          ></div>
          <div className="relative mx-auto grid h-full place-items-center px-12 py-5">
            <MFImage
              src={artwork.artworkUrl}
              alt={artwork.altText}
              width="100%"
              height="100%"
              objectFit="contain"
              strategy="important"
              sizes="2400px (max-width: 1400px)"
              quality={80}
            />
          </div>
        </div>
        {/* Artwork details, notes/alerts and comments */}
        <div className="mx-auto flex w-full flex-col gap-y-2 px-5 pt-6 min-[1400px]:w-[1024px]">
          {/* <span className="mb-2.5">
            <Note type="info" inline>
              Generic info notice
            </Note>
          </span> */}
          <ArtworkDetails
            artTitle={artwork.title ? artwork.title : "No Title"}
            artist={artwork.artist ? artwork.artist.handle : artwork.artistUrl}
            artistImg={artwork.artist && artwork.artist.avatarUrl}
            handle={artwork.artist ? artwork.artist.handle : null}
          />
          {user && (
            <div>
              <Comments>
                <Comments.Field
                  avatar={user.avatarUrl}
                  username={user.handle}
                  handle={user.handle}
                  commentType="art"
                  artworkId={artwork.id}
                />
                {artwork.comments
                  ? artwork.comments.map((comment, index) => (
                      <Comments.Item
                        key={index}
                        avatar={comment.author.avatarUrl}
                        username={comment.author.handle}
                      >
                        {comment.content}
                      </Comments.Item>
                    ))
                  : null}
              </Comments>
            </div>
          )}
        </div>
      </div>
      {/* More from this artist */}
      <aside className="relative w-96 flex-shrink-0 px-6 py-4 ">
        <div className="bg-200 fixed w-80 p-4">
          {artwork.owner.id == user.id && <Button className="float-right">Edit</Button>}
          <h3 className="text-xl">Tools</h3>
          <div className="flex flex-col py-3">
            <span className="text-gray-300">Programs Used</span>
            <span className="text-700">
              {artwork.programUsed ? artwork.programUsed : "Unknown"}
            </span>
          </div>
          <Separator dir="horizontal" />
          {artwork.charactersFeatured && (
            <div className="flex flex-col py-3">
              <h3 className="text-xl">Characters</h3>
              <div className="mt-2">
                {artwork.charactersFeatured.map((character, index) => (
                  <div
                    key={index}
                    className="bg-300 text-700 flex w-fit flex-row items-center"
                  >
                    <MFImage src={character.avatarUrl} width={30} height={30} />
                    <span className="text-700  px-3 py-2">{character.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
