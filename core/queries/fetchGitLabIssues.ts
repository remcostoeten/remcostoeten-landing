import fetch from "node-fetch"

export default async function fetchGitLabData() {
  try {
    const accessToken = process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN
    const username = "remcostoeten"

    const userResponse = await fetch(
      `https://gitlab.com/api/v4/users?username=${username}`,
      {
        headers: {
          "PRIVATE-TOKEN": accessToken,
        },
      }
    )

    if (!userResponse.ok) {
      throw new Error("Failed to fetch GitLab user")
    }

    const userData = await userResponse.json()
    const userId = userData[0].id

    const projectsResponse = await fetch(
      `https://gitlab.com/api/v4/users/${userId}/projects`,
      {
        headers: {
          "PRIVATE-TOKEN": accessToken,
        },
      }
    )

    if (!projectsResponse.ok) {
      throw new Error("Failed to fetch GitLab projects")
    }

    const projectsData = await projectsResponse.json()

    const commitsData = await Promise.all(
      (projectsData as any[]).map(async (project) => {
        const commitsResponse = await fetch(
          `https://gitlab.com/api/v4/projects/${encodeURIComponent(
            project.id
          )}/repository/commits?author_username=${encodeURIComponent(
            username
          )}`,
          {
            headers: {
              "PRIVATE-TOKEN": accessToken,
            },
          }
        )

        if (!commitsResponse.ok) {
          throw new Error("Failed to fetch GitLab commits")
        }

        return await commitsResponse.json()
      })
    )

    return {
      commits: commitsData.flat(),
    }
  } catch (error) {
    console.error(error)
    return {
      commits: [],
    }
  }
}
