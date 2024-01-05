'use client';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@c/ui/tooltip";
import Link from "next/link";

export default function Intro() {
    return (
        <div className="mx-auto max-w-4xl">
            <div>
                <h1 className="font-sora flex gap-2   text-2xl font-medium lg:text-3xl">
                    Hi, I&apos;m Remco Stoeten{''}
                    <span aria-label="waving hand" className="wave" role="img">
                        👋
                    </span>
                </h1>
            </div>
            <div className="mt-2">
                <ul className="flex list-disc flex-col gap-1  text-neutral-700 sm:ml-5 lg:flex-row lg:gap-8 dark:text-neutral-400">
                    <li>Front-end Engineer</li>
                    <li >
                        <Tooltip>
                            <TooltipTrigger className="flex gap-2">
                                Based in Lemmer, the Netherlands{" "}
                                <span className='hidden sm:flex' aria-label="Dutch flag" role="img">
                                    🇳🇱
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>But remote is ❤️</TooltipContent>
                        </Tooltip>
                    </li>
                </ul>
                <p className="mt-4 leading-[1.8] text-neutral-800 md:leading-loose dark:text-neutral-300">
                    I am a recovering ex-Magento developer and currently building open source software at <Link className="underline" href='https://gitlab.com/pleio/frontend' target="_blank">Pleio</Link>. Primarily working
                    with TypeScript & Next.js, have done a little Python, Shell & Lua, and want to learn Go, OCaml 🐪 and DevOps.
                </p>
            </div>
            <hr className="my-8" />
        </div >
    )
}

