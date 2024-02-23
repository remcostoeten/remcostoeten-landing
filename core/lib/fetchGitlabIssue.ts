interface GitLabIssue {
    id: number
    iid: number
    title: string
    web_url: string
    state: string
    labels: string[]
}

interface Task {
    id: number
    code: string
    title: string
    url: string
    status: string
    labels: string[]
}

export const fetchGitLabIssues = async (
    options: { boardId?: number; label?: string } = {}
): Promise<Task[]> => {
    const { boardId, label } = options

    const apiUrl = `https://gitlab.com/api/v4/boards/${boardId}/issues?label_name=${label}`
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer glpat-fUDUHLEx43ZMS7U8Mpzx`,
        },
    })

    if (!response.ok) {
        throw new Error(`Error fetching GitLab issues: ${response.statusText}`)
    }

    const data: GitLabIssue[] = await response.json()

    // Ensure that data is an array before calling map
    if (!Array.isArray(data)) {
        throw new Error("GitLab API response is not an array")
    }

    return data.map((issue) => ({
        id: issue.id,
        code: `TASK-${issue.iid}`,
        title: issue.title,
        url: issue.web_url,
        status: issue.state === "opened" ? "todo" : "done",
        labels: issue.labels,
    }))
}
1
