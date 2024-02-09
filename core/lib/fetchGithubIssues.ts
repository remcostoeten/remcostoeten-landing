interface Issue {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  labels: {
    name: string
    color: string
  }[]
}

interface Task {
  id: number
  code: string
  title: string
  url: string
  status: string
  labels: {
    name: string
    color: string
  }[]
}

export const fetchGithubIssues = async (
  options: { endpoint?: string; queryParams?: Record<string, string> } = {}
): Promise<Task[]> => {
  const { endpoint = "issues", queryParams = {} } = options

  const queryString = new URLSearchParams(queryParams).toString()
  const apiUrl = `https://api.github.com/repos/remcostoeten/blog-remcostoetn/${endpoint}?${queryString}`

  const response = await fetch(apiUrl)
  const data: Issue[] = await response.json()
  return data.map((issue) => ({
    id: issue.id,
    code: `TASK-${issue.number}`,
    title: issue.title,
    url: issue.html_url,
    status: issue.state === "open" ? "todo" : "done",
    labels: issue.labels.map((label) => ({
      name: label.name,
      color: label.color,
    })),
  }))
}
