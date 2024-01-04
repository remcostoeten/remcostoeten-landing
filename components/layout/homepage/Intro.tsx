
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
                <ul className="ml-5 flex list-disc flex-col items-center gap-1 text-neutral-700 lg:flex-row lg:gap-8 dark:text-neutral-400">
                    <li>Software Engineer</li>
                    <li>
                        Based in Lemmer, the Netherlands{" "}
                        <span aria-label="Dutch flag" role="img">
                            🇳🇱
                        </span>
                    </li>
                </ul>
                <p className="mt-4 leading-[1.8] text-neutral-800 md:leading-loose dark:text-neutral-300">
                    I am a recovering ex-Magento developer and currently building open source software at Pleio. Primarily working
                    with TypeScript & Next.js, have done a little Python, Shell & Lua, and want to learn Go, OCaml 🐪 and DevOps.
                </p>
            </div>
            <hr className="my-8" />
        </div >
    )
}

