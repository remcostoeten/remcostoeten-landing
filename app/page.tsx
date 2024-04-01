"use client"

import LatestArticle from "@/components/blog/LatestArticle"
import GitlabIssues from "@/components/core/data/GitlabIssues"
import GitHubCalendar from "@/components/core/data/github/GithubCalender"
import GithubContributionCards from "@/components/core/data/github/GithubContributions"
import WIPToast from "@/components/effects/InProgressToast"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <>
      {/* <GitlabIssues /> */}
      <section className="container items-center gap-2 !p-0 md:grid ">
        <Intro />
        <GithubContributionCards />
        <GitHubCalendar username="remcostoeten" />
        <hr className="my-4" />
        <LatestArticle />
      </section>
    </>
  )
}
