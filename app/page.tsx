import Link from "next/link"

import { siteConfig } from "@/core/config/site"
import { buttonVariants } from "@/components/ui/button"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <section className="container items-center gap-6 !p-0 md:grid ">
      <Intro />
    </section>
  )
}
