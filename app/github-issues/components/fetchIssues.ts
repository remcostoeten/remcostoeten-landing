export const fetchGithubIssues = async () => {
    const response = await fetch(
        "https://api.github.com/repos/remcostoeten/blog-remcostoetn/issues"
    )
    const data = await response.json()

    console.log(data)
    // all data we want to display in table:
    // state: "open" | "closed"
    // created_)at: "2021-05-02T14:04:04Z"
    // labels.name
    // title

    return data.map((issue) => ({
        id: issue.id,
        created_at: issue.created_at,
        code: `TASK-${issue.number}`,
        title: issue.title,
        status: issue.state === "open" ? "todo" : "done",
        label: issue.labels.map((label) => label.name),
    }))
}