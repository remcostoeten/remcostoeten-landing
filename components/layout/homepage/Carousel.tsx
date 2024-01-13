import Reac, { useRef } from "react"
import { HiOutlineNewspaper } from "react-icons/hi"

import { LoadingArticle } from "@/components/effects/Skeleton"

import SectionHeading from "../SectionHeading"
import SectionSubHeading from "../SectionSubHeading"

export default function LatestArticle() {
  const scrollContainer = useRef(null)

  let isDown = false
  let startX
  let scrollLeft

  function handleMouseDown(e) {
    isDown = true
    startX = e.pageX - scrollContainer.current.offsetLeft
    scrollLeft = scrollContainer.current.scrollLeft
  }

  function handleMouseLeave() {
    isDown = false
  }

  function handleMouseUp() {
    isDown = false
  }

  function handleMouseMove(e) {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollContainer.current.offsetLeft
    const walk = (x - startX) * 3
    scrollContainer.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section>
      <div className="space-y-2">
        <SectionHeading
          title="Latest Articles"
          icon={<HiOutlineNewspaper className="mr-1" />}
        />
        <SectionSubHeading>
          <p className="dark:text-neutral-400">Latest articles from dev.to</p>
        </SectionSubHeading>
      </div>
      <div
        className="scrollbar-hide mt-6 flex h-40 flex-row space-x-3 overflow-x-scroll"
        ref={scrollContainer}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <LoadingArticle key={index} />
          ))}
      </div>
    </section>
  )
}
