import fetch from "node-fetch";

export default async function fetchGitLabData() {
  try {
    const accessToken = process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("GitLab access token not provided");
    }

    const username = "remcostoeten";

    const userResponse = await fetch(
      `https://gitlab.com/api/v4/users?username=${username}`,
      {
        headers: {
          "PRIVATE-TOKEN": accessToken,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch GitLab user");
    }

    const userData = await userResponse.json();
    const userId = userData[0].id;

    const activitiesResponse = await fetch(
      `https://gitlab.com/api/v4/users/${userId}/events?per_page=50`,
      {
        headers: {
          "PRIVATE-TOKEN": accessToken,
        },
      }
    );

    if (!activitiesResponse.ok) {
      throw new Error("Failed to fetch GitLab activities");
    }

    const activitiesData = await activitiesResponse.json();

    console.log("Fetched GitLab activities successfully");
    console.log(activitiesData); // Log the fetched activities data

    return {
      activities: activitiesData,
    };
  } catch (error) {
    console.error(error);
    return {
      activities: [],
    };
  }
}
