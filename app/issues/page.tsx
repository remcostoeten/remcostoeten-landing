"use client"

import React, { useEffect, useState } from "react"

import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues"
import { Shell } from "@/components/(table)/shell"
import { TasksTableShell } from "@/components/(table)/task-table-shell"

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ searchParams }) => {
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
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
    <Shell>
      <TasksTableShell data={allTasks} pageCount={pageCount} />
    </Shell>
  )
}

export default IndexPage
