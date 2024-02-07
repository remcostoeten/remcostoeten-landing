"use client"

import GitlabIssues from "@/components/core/data/GitlabIssues"
import GitHubCalendar from "@/components/core/data/github/GithubCalender"
import GithubContributionCards from "@/components/core/data/github/GithubContributions"
import WIPToast from "@/components/effects/InProgressToast"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <>
      <WIPToast />
      {/* <GitlabIssues /> */}
      <section className="container items-center gap-2 !p-0 md:grid ">
        <div className="section-wrapper--big">
          <Intro />
        </div>
        <div className="section-wrapper">
          <LatestArticle />
        </div>
        <div className="section-wrapper--small">
          <GitHubCalendar username="remcostoeten" />
          <GithubContributionCards />
        </div>
      </section>
    </>
  )
}
