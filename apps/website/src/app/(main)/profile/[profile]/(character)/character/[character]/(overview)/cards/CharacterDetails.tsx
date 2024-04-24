import { displayGender, displayPronouns } from "@/utils/displayer"
import type { CharacterAttributes } from "@/types/characters"

export default function CharacterDetails({
  attributes
}: {
  attributes: CharacterAttributes
}) {
  // const customFields =
  //   attributes.custom_fields && attributes.custom_fields.length > 0
  //     ? attributes.custom_fields.map((field, index) => (
  //         <Attribute key={index} name={field.property} value={field.value} />
  //       ))
  //     : null

  return (
    <div className="w-11/12">
      <h1 className="mb-4 text-2xl"> Character Details</h1>
      <div className="bg-200 flex flex-row flex-wrap">
        <Attribute name="Pronouns" value={displayPronouns(attributes.pronouns)} />
        <Attribute name="Gender" value={displayGender(attributes.gender)} />
        {attributes.preferences.likes && (
          <Attribute name="Likes" value={attributes.preferences.likes.join(", ")} />
        )}
        {attributes.preferences.dislikes && (
          <Attribute name="Dislikes" value={attributes.preferences.dislikes.join(", ")} />
        )}
        {/* {customFields} */}
        <Attribute name="Bio" value={attributes.bio} />
      </div>
    </div>
  )
}

function Attribute({ name, value }: { name: string; value: string }) {
  return (
    <div className="items-left my-4 flex w-1/2 flex-col px-6">
      <h3 className="text-500 text-lg">{name}</h3>
      <h3 className="text-lg">{value}</h3>
    </div>
  )
}
