export const createGithubIssue = async (
    title: string,
    body: string,
    assignees: string[],
    labels: string[]
): Promise<void> => {
    const apiUrl = `https://api.github.com/repos/remcostoeten/blog-remcostoetn/issues`

    console.log('GitHub Token:', process.env.NEXT_PUBLIC_GITHUB_TOKEN)

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            title,
            body,
            assignees,
            labels,
        }),
    })

    if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`)
    }
}