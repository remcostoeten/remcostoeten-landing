import React, { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/core/redux/store"
import { selectThemeMode } from "@/core/redux/themeSlice"
import { AiOutlineHome } from "react-icons/ai"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { useProjects } from "./index"
import { MiniSpinner } from "../effects/Spinner"

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
