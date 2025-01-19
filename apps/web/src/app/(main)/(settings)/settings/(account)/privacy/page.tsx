import { Button } from "@mav/ui/components/buttons"
import { InputField } from "@mav/ui/components/fields"
import { Group, GroupContainer } from "@mav/ui/components/layouts"

export const metadata = {
  title: "Data & privacy"
}

export default function SettingsPrivacyPage() {
  return (
    <GroupContainer>
      <Group title="Change Password">
        <form className="flex flex-col gap-y-2">
          <InputField type="password" inputName="Current password" />
          <InputField type="password" inputName="New password" />
          <InputField type="password" inputName="Repeat new password" />
          <span>
            <Button>Change password</Button>
          </span>
        </form>
      </Group>
      <Group
        title="Linked accounts"
        description="Manage your login from third-party authenticators"
      >
        <Button>Link account via Google</Button>
        <Button>Link account via X</Button>
        <Button>Link account via Apple ID</Button>
      </Group>
      <Group title="Two-factor authentication">content</Group>
    </GroupContainer>
  )
}
