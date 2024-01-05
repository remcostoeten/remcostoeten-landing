import Link from "next/link"

import { siteConfig } from "@/core/config/site"
import { buttonVariants } from "@/components/ui/button"
import Intro from "@/components/layout/homepage/Intro"
import LatestArticle from "@/components/layout/homepage/Articles"

export default function IndexPage() {
  return (
    <section className="container items-center gap-2 !p-0 md:grid ">
      <Intro />
      <LatestArticle />
    </section>
  )
}
