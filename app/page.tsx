import AnimatedAnchor from "@/components/effects/AnimatedAnchor"
import WIPToast from "@/components/effects/InProgressToast"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <>
      <WIPToast />
      <AnimatedAnchor backgroundColor="#fff" anchor="#intro">
        Some anchor text

      </AnimatedAnchor>
      <section className="container items-center gap-2 !p-0 md:grid ">
        <Intro />
        <LatestArticle />
      </section>
    </>
  )
}