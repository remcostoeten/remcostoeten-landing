"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"

import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues"
import { Shell } from "@/components/(table)/shell"
import { TasksTableShell } from "@/components/(table)/task-table-shell"
import Seperator from "@/components/layout/Seperator"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ searchParams }) => {
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    setTimeout(() => {
      toast("WiP. Crud / filters are under construction")
    }, 2222)

    const getIssues = async () => {
      const tasks = await fetchGithubIssues()
      setAllTasks(tasks)
    }

    getIssues()
  }, [])

  const totalTasks = allTasks.length
  const limit = 10
  const pageCount = Math.ceil(totalTasks / limit)

  return (
    <>
      <h1 className="text-2xl">Project issues</h1>
      <p className="text-gray-400">
        Issues fetched from the repository issues. Long term goal is to make the
        CRUD-actions work, allow for filtering and even mutate all date.
      </p>
      <Seperator spacingTop="12" spacingBottom="24" />
      <Shell>
        <TasksTableShell data={allTasks} pageCount={pageCount} />
      </Shell>
    </>
  )
}

export default IndexPage
