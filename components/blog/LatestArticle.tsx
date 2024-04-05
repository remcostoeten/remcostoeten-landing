import { Metadata } from "next"
import { pick } from "contentlayer/client"
import { allBlogs } from "contentlayer/generated"
import { Code2Icon } from "lucide-react"

import BlogPost from "@/components/blog/BlogPost"

import { AnimatedLink } from "../core/Link"
import SectionHeading from "../layout/SectionHeading"
import SectionSubHeading from "../layout/SectionSubHeading"

export const metadata: Metadata = {
  title: "Blog",
}

export default function LatestArticles() {
  const posts = allBlogs
    .map((post) =>
      pick(post, [
        "slug",
        "title",
        "summary",
        "publishedAt",
        "image",
        "blurDataURL",
      ])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )

  return (
    <main className="main-container">
      <section className="space-y-4">
        <SectionHeading
          title="Some snippets"
          icon={<Code2Icon className="mr-1" />}
        />
        <SectionSubHeading>
          <p className="dark:text-neutral-400">
            Some stuff I document for myself. This feature is still in progress
            and not working properly. All my blog posts are available on my{" "}
            <a href="https://snippets.remcostoeten.com">
              snippets site for now untill I migarte it over to
              <AnimatedLink
                href="https://gitlab.com/remcostoeten"
                target="_blank"
              >
                GitLab
              </AnimatedLink>
            </a>
            .
          </p>
        </SectionSubHeading>
        <div className="flex flex-col space-y-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </main>
  )
}
