"use client"

import Gradient from "@/components/core/BackgroundGradientEffect"
import GitLabCommits from "@/components/core/data/GitlabIssues"
import WIPToast from "@/components/effects/InProgressToast"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"
import VisualizeComponent from "@/core/lib/VisualizeComponent"

export default function IndexPage() {
  return (
    <>
      <WIPToast />
      <VisualizeComponent>
        <GitLabCommits />
      </VisualizeComponent>
      <section className="container items-center gap-2 !p-0 md:grid ">
        <Intro />
        <LatestArticle />
      </section>
    </>
  )
}
