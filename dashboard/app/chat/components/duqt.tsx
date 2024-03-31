import * as React from "react";
import Image from "next/image";
import CommentSection from './comment-section'
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, className }) => (
  <Image src={src} alt={alt} className={className} width={40} height={40} />
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => (
  <button
    className={`justify-center px-4 py-3.5 rounded-md bg-zinc-100 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div
    className={`justify-center px-2 py-1.5 text-xs leading-5 whitespace-nowrap rounded bg-white bg-opacity-10 text-neutral-400 ${className}`}
  >
    {children}
  </div>
);

const avatars = [
  { src: "/images/avatar1.png", alt: "Avatar 1" },
  { src: "/images/avatar2.png", alt: "Avatar 2" },
  { src: "/images/avatar3.png", alt: "Avatar 3" },
  { src: "/images/avatar4.png", alt: "Avatar 4" },
  { src: "/images/avatar5.png", alt: "Avatar 5" },
  { src: "/images/avatar6.png", alt: "Avatar 6" },
];

const icons = [
  { src: "/images/icon1.png", alt: "Icon 1" },
  { src: "/images/icon2.png", alt: "Icon 2" },
];

function CChat() {
  return (
    <div className="flex flex-col pb-20 max-md:max-w-full">
      <header className="z-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <main className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col grow max-md:max-w-full">
              <div className="flex flex-col justify-center px-4 py-20 tracking-wide text-white max-md:pr-5 max-md:max-w-full">
                <div className="flex gap-3 items-start mt-6 mb-80 max-md:flex-wrap max-md:mb-10">
                  <CustomImage
                    src="/images/virtual-agent.png"
                    alt="Virtual Agent"
                    className="shrink-0 w-10 aspect-square"
                  />
               <section className="flex flex-col grow shrink-0 justify-center py-4 pr-11 pl-3.5 rounded-lg basis-0 bg-white bg-opacity-10 w-fit max-md:pr-5 max-md:max-w-full">
  <p className="text-sm leading-6 max-md:max-w-full">
    Hello, I'm your virtual agent. You can ask me anything, and I'll do my best to answer you. If you
  </p>
  <div className="flex gap-2 mt-1 max-md:flex-wrap">
    <p className="flex-auto my-auto text-sm leading-6">
      need a more professional or customized agent, click on
    </p>
    <div className="flex gap-1">
      <span className="justify-center py-2 text-xs leading-3 whitespace-nowrap rounded border border-solid bg-white bg-opacity-10 border-zinc-800">
        +
      </span>
      <p className="flex-auto my-auto text-sm leading-6">
        to create a custom agent.
      </p>
    </div>
  </div>
</section>
                </div>
              </div>

                    <CommentSection/>
            </section>
          </main>
          <aside className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-20 mx-auto w-full bg-black border-l border-solid border-l-zinc-800">
              <div className="flex gap-5 justify-center px-4 py-3.5 w-full shadow-sm bg-white bg-opacity-0">
                <div className="my-auto text-sm leading-6 text-white">
                  Topic List
                </div>
                <div className="flex flex-1 gap-0.5">
                  <CustomImage
                    src="/images/plus.png"
                    alt="Plus"
                    className="shrink-0 w-6 aspect-square"
                  />
                  <CustomImage
                    src="/images/dots.png"
                    alt="Dots"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-col py-px mt-1.5 w-full rounded-md border border-solid border-zinc-800">
                <div className="flex gap-0 self-end">
                  <CustomImage
                    src="/images/topic-list.png"
                    alt="Topic List"
                    className="shrink-0 max-w-full aspect-[1.67] w-[200px]"
                  />
                  <CustomImage
                    src="/images/close.png"
                    alt="Close"
                    className="shrink-0 self-start mt-2 w-6 aspect-square"
                  />
                </div>
                <div className="flex flex-col px-4 pb-4 text-sm leading-6 text-neutral-500">
                  <h2 className="text-base font-medium leading-7 text-white">
                    Topic List
                  </h2>
                  <p className="mt-2 max-md:mr-2.5">
                    Click the button on the left to save{" "}
                  </p>
                  <p className="max-md:mr-2.5">
                    the current session as a historical{" "}
                  </p>
                  <p className="max-md:mr-2.5">topic and start a new session.</p>
                </div>
              </div>
              <div className="flex gap-3 items-center py-2.5 pr-20 pl-3.5 mt-2 rounded-md bg-white bg-opacity-10 max-md:pr-5">
                <CustomImage
                  src="/images/checkmark.png"
                  alt="Checkmark"
                  className="shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
                <div className="self-stretch my-auto text-sm leading-6 text-white">
                  Default Topic
                </div>
                <Badge>Temporary</Badge>
              </div>
            </div>
          </aside>
        </div>
      </header>
      <div className="flex gap-5 justify-center px-4 py-3 mt-0 w-full border-b border-solid border-b-zinc-800 max-md:flex-wrap max-md:mt-0 max-md:max-w-full">
        <div className="flex gap-3 max-md:flex-wrap">
          <CustomImage
            src="/images/just-chat.png"
            alt="Just Chat"
            className="shrink-0 w-10 aspect-square"
          />
          <div className="flex flex-col self-start max-md:max-w-full">
            <div className="flex gap-2 pr-20 max-md:flex-wrap max-md:pr-5">
              <h1 className="my-auto text-sm font-bold leading-4 text-white">
                Just Chat
              </h1>
              <Badge>
                <CustomImage
                  src="/images/model.png"
                  alt="Model"
                  className="shrink-0 self-start w-3 aspect-square"
                />
                <div>gpt-3.5-turbo</div>
              </Badge>
            </div>
            <p className="mt-1.5 text-xs leading-3 text-neutral-500 max-md:mr-2.5 max-md:max-w-full">
              Activate the brain cluster and spark creative thinking. Your
              virtual agent is here to communicate with you about everything.
            </p>
          </div>
        </div>
        <div className="flex gap-2 my-auto">
          <CustomImage
            src="/images/settings.png"
            alt="Settings"
            className="shrink-0 w-9 aspect-square"
          />
          <CustomImage
            src="/images/expand.png"
            alt="Expand"
            className="shrink-0 w-9 aspect-square"
          />
          <CustomImage
            src="/images/close.png"
            alt="Close"
            className="shrink-0 w-9 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}

export default CChat