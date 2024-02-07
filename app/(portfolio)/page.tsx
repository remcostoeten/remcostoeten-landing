import Pill from "@/components/Pill"
import WIPToast from "@/components/effects/InProgressToast"
import Sprinkle from "@/components/effects/Sprinkle"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"

export default function IndexPage() {
  return (
    <>
      <WIPToast />
      <section className="container items-center gap-2 !p-0 md:grid ">
        <Intro />
        <LatestArticle />
        <span className="cta-sprinkle">
          {/* <Sprinkle opacity={0.2} randomness={125} starColor="#fff" starCount={25} className='py-2 text-neutral-400'>
                        <Pill>Still a loooooooooot to do</Pill>
                    </Sprinkle> */}
        </span>
      </section>
    </>
  )
}
