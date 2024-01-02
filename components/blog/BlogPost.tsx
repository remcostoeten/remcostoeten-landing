// @ts-nocheck

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Blog } from "contentlayer/generated"
import dayjs from "dayjs"

import { getViews } from "@/core/lib/fetcher"

const Views = async ({ slug }: { slug: string }) => {
  const views = await getViews(slug)

  return <>{views} views</>
}

type Props = Pick<
  Blog,
  "title" | "summary" | "slug" | "publishedAt" | "image" | "blurDataURL"
>

const BlogPost = ({ slug, title, publishedAt, image, blurDataURL }: Props) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group max-w-sm sm:max-w-none">
        {image ? (
          <div className="mb-2 flex">
            <Image
              src={image}
              width="1200"
              height="627"
              alt={title}
              className="rounded-lg"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority
            />
          </div>
        ) : (
          <Image
            src="/placeholder.jpg"
            width="1200"
            height="627"
            alt={title}
            className="rounded-lg"
          />
        )}

        <div className="space-y-2">
          <h3 className="title-hover text-xl font-semibold">{title}</h3>

          <p className="text-sm text-gray-400">
            {dayjs(publishedAt).format("MMMM D, YYYY")} {` • `}
            <Suspense>
              <Views slug={slug} />
            </Suspense>
          </p>
        </div>
      </article>
    </Link>
  )
}

export default BlogPost
