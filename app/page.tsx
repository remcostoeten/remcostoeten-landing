import AnimatedAnchor from "@/components/effects/AnimatedAnchor"
import WIPToast from "@/components/effects/InProgressToast"
import LatestArticle from "@/components/layout/homepage/Articles"
import Intro from "@/components/layout/homepage/Intro"


const AnchorAnimation: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '1px',
    backgroundColor: 'black',
    overflow: 'hidden',
  };

  const anchorStyle: React.CSSProperties = {
    position: 'absolute',
    width: '0%',
    height: '100%',
    backgroundColor: 'black',
    animation: 'anchorAnimation 4s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <div style={anchorStyle}></div>
    </div>
  );
};


export default function IndexPage() {
  return (
    <>
      <AnchorAnimation />
      <WIPToast />
      <AnimatedAnchor backgroundColor="#fff" anchor="#intro">
        Some anchor text
      </AnimatedAnchor>
      <section className="container items-center gap-2 !p-0 md:grid ">
        <Intro />
        <LatestArticle />
      </section>
    </>
  )
}
