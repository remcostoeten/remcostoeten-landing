export const fetchGithubIssues = async () => {
  const response = await fetch(
    "https://api.github.com/repos/remcostoeten/blog-remcostoetn/issues"
  )
  const data = await response.json()
  return data.map((issue) => ({
    id: issue.id,
    code: `TASK-${issue.number}`,
    title: issue.title,
    status: issue.state === "open" ? "todo" : "done",
    labels: issue.labels.map((label) => ({ name: label.name, color: label.color })),
  }))
}