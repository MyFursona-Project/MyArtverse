import type { Metadata } from "next"
import { Field, Group, MarginClamp } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import Comments from "@/components/ui/Comments"
import { fetchUser } from "@/utils/api"
import { LuFilter } from "react-icons/lu"
import type { SlugRouteProps } from "@/types/utils"

export async function generateMetadata({ params }: SlugRouteProps): Promise<Metadata> {
  const decodeUserHandle = params.profile

  return {
    title: `User`,
    description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
  }
}

export default async function Page({ params }) {
  const userData = await fetchUser(params.profile)
  if (!userData) return null
  // TODO: Redirect to 404 instead of login when api route for user by handler is implemented
  return (
    <MarginClamp>
      <div className="flex w-full gap-3">
        <div className="w-1/2 flex-shrink-0"></div>
        <div className="w-1/2 flex-shrink-0">
          <Group>
            <Group.Header>
              About {userData.displayName ? userData.displayName : userData.handle}
            </Group.Header>
            <Group.HeaderButtons>
              <Button size="small">Edit</Button>
            </Group.HeaderButtons>
            <Group.Content>
              <Field
                title="Date joined"
                content={new Date(userData.dateRegistered).toDateString()}
              />
              {/* TODO: Custom attributes for Backend */}
              <Field
                title="Birthday"
                content={
                  userData.birthday
                    ? new Date(userData.birthday).toDateString()
                    : "Not Set"
                }
              />
              <Field
                title="Pronouns"
                content={userData.pronouns ? userData.pronouns : "Not Set"}
              />
              <Field
                title="Nationality"
                content={userData.nationaility ? userData.nationaility : "Not Set"}
              />
              {/* <Field title="Nationality" content="Murica" /> */}
            </Group.Content>
          </Group>
          <Comments className="my-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-2xl font-bold">Comments</span>
                <span className="border-400 rounded-full border border-solid px-4 py-1">
                  {Comments.length > 0 ? Comments.length : 0}
                </span>
              </div>
              <Button prefixIcon={<LuFilter size={16} />}>Sort</Button>
            </div>
            <div className="bg-200 flex flex-col gap-y-5 rounded px-6 py-4">
              {/* TODO: Change color */}
              <Comments.Field
                username={userData.handle}
                avatar={userData.avatarUrl}
                commentType="profile"
              />
              {userData.comments.map((comment, index) => (
                <Comments.Item
                  username={`@${comment.author.handle}`}
                  avatar={comment.author.avatarUrl}
                  handle={comment.author.handle}
                  key={index}
                >
                  {comment.content}
                </Comments.Item>
              ))}
            </div>
          </Comments>
        </div>
      </div>
    </MarginClamp>
  )
}
