"use client"

import GitHubCalendar from "@/components/core/data/github/GithubCalender"
import GithubContributionCards from "@/components/core/data/github/GithubContributions"
import WIPToast from "@/components/effects/InProgressToast"
import Seperator from "@/components/layout/Seperator"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <>
      <WIPToast />
      {/* <GitlabIssues /> */}
      <section className="container items-center gap-2 !p-0 md:grid ">
        <div className="section-wrapper--small">
          <Intro />
        </div>
        <Seperator />
        <div className="section-wrapper--small">
          <div className="section-wrapper">
            <LatestArticle />
          </div>
          <Seperator />
        </div>{" "}
        {/* Added closing tag for the div element */}
        <div className="section-wrapper--small">
          <GitHubCalendar username="remcostoeten" />
          <GithubContributionCards />
          <Seperator />
        </div>
      </section>
    </>
  )
}
