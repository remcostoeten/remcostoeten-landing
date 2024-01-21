"use client"

import React, { useEffect, useMemo, useState } from "react"
import { NextRouter, useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@/core/redux/store"
import { selectThemeMode, switchTheme } from "@/core/redux/themeSlice"
import { Layout, Menu, MenuProps, Spin } from "antd"
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai"

import { signOut } from "@/core/lib/database/google"
import { useProjects } from "@/src/utils"


const useCurMenu = (router: NextRouter) => {
  const [curMenu, setCurMenu] = useState<string>("")
  const { projectId } = router.query

  useEffect(() => {
    if (router.asPath === "/projects") {
      setCurMenu("home")
    }
    if (projectId) {
      setCurMenu(projectId as string)
    }
  }, [projectId, router.asPath])

  return curMenu
}

export const ProjectsSidebar: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector(selectThemeMode)
  const router = useRouter()
  const { projects, loading } = useProjects()
  const curMenu = useCurMenu(router)

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

  const projectItems: MenuProps["items"] = [
    {
      label: "Home",
      key: "home",
      icon: <AiOutlineHome />,
      onClick: () => {
        router.push("/projects")
      },
    },
    {
      type: "group",
      label: "Projects",
      key: "projects",
      children: projectItemsChildren,
    },
  ]

  if (!router.asPath.startsWith("/projects")) return <>{children}</>

  return (
    <Layout.Sider theme="light" collapsible className="border-r">
      {loading ? (
        <div className="mt-20 flex justify-center">
          <Spin />
        </div>
      ) : (
        <Menu
          selectedKeys={[curMenu]}
          selectable={false}
          className=""
          mode="inline"
          items={projectItems}
        />
      )}
    </Layout.Sider>
  )
}
