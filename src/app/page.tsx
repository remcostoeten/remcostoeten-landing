"use client";

import GitHubCalendar from "@/components/core/data/github/GithubCalender";
import GithubContributionCards from "@/components/core/data/github/GithubContributions";
import LatestArticle from "@/components/pages/homepage/Articles";
import Intro from "@/components/pages/homepage/Intro";

export default function IndexPage() {
  return (
    <>
      {/* <GitlabIssues /> */}
      <section className="container gap-2 !p-0 flex flex-col  ">
        <Intro />
        <GithubContributionCards />
        <GitHubCalendar username="remcostoeten" />
        <hr className="my-4" />
        <LatestArticle />
      </section>
    </>
  );
}
