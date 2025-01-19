import { Badge } from "@mav/ui/components/badges"
import { Button } from "@mav/ui/components/buttons"
import { LuShield } from "react-icons/lu"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-5 p-24">
      <h2 className="text-xl">Badges</h2>
      <div className="flex items-center gap-x-2">
        <Badge size="small">small</Badge>
        <Badge size="small" icon={LuShield}>
          With icon
        </Badge>
        <Badge size="medium">medium</Badge>
        <Badge size="medium" icon={LuShield}>
          With icon
        </Badge>
        <Badge size="big">big</Badge>
        <Badge size="big" icon={LuShield} />
        <Badge size="big" icon={LuShield}>
          With icon
        </Badge>
      </div>
      <div className="flex items-center gap-x-2">
        <Badge variant="primary">primary</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="alert">alert</Badge>
        <Badge variant="alert" icon={LuShield}>
          With icon
        </Badge>
        <Badge variant="info">info</Badge>
        <Badge variant="info" icon={LuShield}>
          With icon
        </Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="success" icon={LuShield}>
          With icon
        </Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="warning" icon={LuShield}>
          With icon
        </Badge>
      </div>
      <h2 className="text-xl">Buttons</h2>
      <div className="flex items-center gap-x-2">
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="small" prefix={<LuShield size={18} />}>
          With icon
        </Button>
        <Button
          variant="secondary"
          prefix={<LuShield size={18} />}
          suffix={
            <Badge size="small" variant="primary">
              123
            </Badge>
          }
        >
          With icon + Badge
        </Button>
        <Button variant="primary" size="big">
          Big
        </Button>
        <Button variant="secondary" size="small">
          Small Secondary
        </Button>
        <Button variant="tritery" size="small">
          Small Tritery
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button prefix={<div>Prefix</div>} suffix={<div>Suffix</div>}>
          Button
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tritery">Tritery</Button>
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
        <Button variant="tritery" disabled>
          Disabled Tritery
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant="alert">Alert</Button>
        <Button variant="alert-secondary">Alert Secondary</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="warning-secondary">Warning Secondary</Button>
      </div>
      <div className="flex items-center gap-x-2">
        <Button size="small" variant="alert">
          Small Alert
        </Button>
        <Button size="small" variant="alert-secondary">
          Small Alert Secondary
        </Button>
        <Button size="small" variant="warning">
          Small Warning
        </Button>
        <Button size="small" variant="warning-secondary">
          Small Warning Secondary
        </Button>
      </div>
    </main>
  )
}
