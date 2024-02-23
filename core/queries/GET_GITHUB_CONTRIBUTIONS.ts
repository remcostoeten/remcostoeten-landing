import { gql } from "@apollo/client/core"

export const GET_GITHUB_CONTRIBUTION_STATS = gql`
  query GetGitHubContributionStats($username: String!) {
    user(login: $username) {
      repositories(first: 100) {
        nodes {
          name
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 0) {
                  totalCount
                }
              }
            }
          }
          refs(refPrefix: "refs/heads/") {
            totalCount
          }
          languages(first: 10) {
            nodes {
              name
            }
          }
        }
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export const GET_CONTRIBUTIONS = gql`
  query GetUserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`
