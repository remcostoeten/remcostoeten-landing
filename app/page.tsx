import Link from "next/link"

import { siteConfig } from "@/core/config/site"
import { buttonVariants } from "@/components/ui/button"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <section className="container items-center gap-2 !p-0 md:grid ">
      <Intro />
      <LatestArticle />
    </section>
  )
}
