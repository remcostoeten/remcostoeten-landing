"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues"
import { Shell } from "@/components/(table)/shell"
import { TasksTableShell } from "@/components/(table)/task-table-shell"
import IntroShell from "@/components/layout/IntroShell"

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
      <IntroShell
        title="Project issues"
        description="Issues fetched from the repository issues. Long term goal is to make the CRUD-actions work, allow for filtering and even mutate all date."
      />
      <Shell>
        <TasksTableShell data={allTasks} pageCount={pageCount} />
      </Shell>
    </>
  )
}

export default IndexPage

/**
 * Example usage of the IntroShell component.
 *
 * ```jsx
 * <IntroShell
 *     title="Your Title Here"
 *     description="Your description here."
 *     showSeperator={false}
 *     spacingTop="10"
 *     spacingBottom="10"
 * >
 *     <p>Any additional JSX to be rendered after the Seperator can go here.</p>
 * </IntroShell>
 * ```
 *
 * This will render the IntroShell component with the provided title and description.
 * The Seperator will not be shown because showSeperator is set to false.
 * The spacingTop and spacingBottom props control the spacing above and below the Seperator.
 * Any children passed to IntroShell will be rendered after the Seperator.
 */