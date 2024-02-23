import { GithubIcon, GitlabIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ui-imports"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple" size="lg">
      <ToggleGroupItem
        className="border bg-black/10"
        value="italic"
        aria-label="Toggle italic"
      >
        <GithubIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="border bg-black/10"
        value="strikethrough"
        aria-label="Toggle strikethrough"
      >
        <GitlabIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
