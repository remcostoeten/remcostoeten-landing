import React, { useEffect, useState } from "react"

const GitLabIssuesComponent: React.FC = () => {
  const [assignedIssues, setAssignedIssues] = useState([])

  useEffect(() => {
    const fetchGitLabAssignedIssues = async () => {
      try {
        const accessToken = "glpat-fUDUHLEx43ZMS7U8Mpzx"
        const projectPath = "pleio/beheer"

        const response = await fetch(
          `https://gitlab.com/api/v4/issues?project_id=${encodeURIComponent(
            projectPath
          )}&assignee_username=remcostoeten`,
          {
            headers: {
              "PRIVATE-TOKEN": accessToken,
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch GitLab assigned issues")
        }

        const data = await response.json()
        setAssignedIssues(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchGitLabAssignedIssues()
  }, [])

  return (
    <div>
      <h1>GitLab Assigned Issues</h1>
      <ul>
        {assignedIssues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default GitLabIssuesComponent
