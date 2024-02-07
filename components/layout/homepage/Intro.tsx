"use client"

import { TooltipContent, TooltipTrigger } from "@c/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import Link, { AnimatedLink } from "@/components/core/Link"
import CustomTooltip from "@/components/effects/CustomTooltip"

export default function Intro() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="https://next-shadcn-dashboard-starter.vercel.app/dashboard/kanban"
        target="_blank"
      >
        https://next-shadcn-dashboard-starter.vercel.app/dashboard/kanban
      </Link>
      <Link href="https://ui.jln.dev" target="_blank">
        https://ui.jln.dev
      </Link>{" "}
      <div>
        <h1 className="font-sora flex gap-2   text-2xl font-medium lg:text-3xl">
          Hi, I&apos;m Remco Stoeten{""}
          <span aria-label="waving hand" className="wave" role="img">
            👋
          </span>
        </h1>
      </div>
      <div className="mt-2">
        <ul className="flex list-disc flex-col gap-1  text-neutral-700 sm:ml-5 lg:flex-row lg:gap-8 dark:text-neutral-300">
          <li>Front-end Engineer</li>
          <li>
            <Tooltip>
              <TooltipTrigger className="flex gap-2">
                Based in Lemmer, the Netherlands{" "}
                <span
                  className="hidden sm:flex"
                  aria-label="Dutch flag"
                  role="img"
                >
                  🇳🇱
                </span>
              </TooltipTrigger>
              <TooltipContent>But remote is ❤️</TooltipContent>
            </Tooltip>
          </li>
        </ul>
        <p className="mt-4 leading-[1.8] text-neutral-800 md:leading-loose dark:text-neutral-400">
          I am a recovering{" "}
          <CustomTooltip
            triggerClassName="tooltip-border"
            trigger="ex-Magento developer"
            AnimatedAnchor={true}
            content="those 5 years of magento were hard, but i survived ❤️

"
          />{" "}
          and currently building open source software at{" "}
          <AnimatedLink
            brightness="low"
            border="dashed"
            href="https://gitlab.com/pleio/frontend"
            target="_blank"
          >
            Pleio
          </AnimatedLink>
          . Primarily working with TypeScript & Next.js, have done a little
          Python, Shell & Lua, and i'd like to dive into Go and DevOps in the
          near future.
        </p>
        <Button
          variant="outline"
          className="mt-4 text-neutral-800 dark:text-neutral-400 justify-end text-right "
        >
          <Link href="/about">Read more here</Link>
        </Button>
      </div>
    </div>
  )
}
