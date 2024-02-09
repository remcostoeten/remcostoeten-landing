import { useMemo } from "react"
import { useRouter } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { MiniSpinner } from "../effects/Spinner"
import { useProjects } from "./index"

export default function ProjectsSidebar() {
  const router = useRouter()
  const { projects, loading } = useProjects()

  const projectItemsChildren = useMemo(
    () =>
      projects.map((p) => ({
        label: p.title,
        key: p.id ?? p.title,
        onClick: () => {
          router.push(`/projects/${p.id}`)
        },
      })),
    [projects, router]
  )

  return (
    <>
      {loading ? (
        <MiniSpinner />
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            {projectItemsChildren.map((item) => (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger onClick={item.onClick}>
                  {item.label}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  )
}
