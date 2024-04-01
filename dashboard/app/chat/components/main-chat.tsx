import { Textarea } from "@c/ui/textarea";
import * as React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => (
  <div className={`justify-center px-4 py-3.5 rounded-md bg-zinc-100 ${className}`}>
    {children}
  </div>
);

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div className={`justify-center px-2 py-1.5 text-xs leading-5 whitespace-nowrap rounded bg-white bg-opacity-10 text-neutral-400 ${className}`}>
    {children}
  </div>
);

const avatars = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6e2f12aa623f097decbf558abd8299fbf7bc011f7f83646d6d22616c736cd98?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/33935a99691dc4932cea6dd6f5f563a241045b31a8b985677481e7f2f6bdcc8e?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3728321f042cd78743cff1e1e5eef628aa35a5113f091d6dac947808bb1679d1?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 3" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/50c755d5f4757dab3789d6980d220340cf740176ac54fc72de97ab42322b3bb4?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 4" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f483fdadb007527c73fb59bc240866790e0bf3db08eed54a3660d5e5e749135f?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 5" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb5b95d4379852e6f0a849255f413bf2db983708b4ebd0e556810cfc5a9aeeaa?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Avatar 6" },
];

const icons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f8a78d502feae12c5c526ae79b162fabc146847edba0946fad34ef5fc2bedd6?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f2d5b13076fea0ffcbdb1a585c3e4b3cc532e8e34243661a02c34aefda82871?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&", alt: "Icon 2" },
];

function MainChat() {
  return (
    <div className="flex flex-col pb-20 max-md:max-w-full">
      <header className="z-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <main className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col grow max-md:max-w-full">
              <div className="flex flex-col justify-center px-4 py-20 tracking-wide text-white max-md:pr-5 max-md:max-w-full">
                <div className="flex gap-3 items-start mt-6 mb-80 max-md:flex-wrap max-md:mb-10">
                  <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bfc0c23759211747cf382e25841f88fb2a9402074148602cd916ba95b451ec0?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Virtual Agent" className="shrink-0 w-10 aspect-square" />
                  <Textarea className="flex w-full flex-col grow shrink-0 justify-center py-4 pr-11 pl-3.5 rounded-lg basis-0 bg-transparent bg-opacity-10 w-fit max-md:pr-5 max-md:max-w-full" />
                  </div>
                  </div>
              <div className="flex flex-col justify-center py-4 border-t border-solid border-zinc-800 max-md:max-w-full">
                <div className="flex gap-0 px-4 max-md:flex-wrap">
                  <div className="flex gap-3 pr-20 max-md:flex-wrap">
                    <div className="flex gap-1">
                      {avatars.map((avatar, index) => (
                        <Image key={index} src={avatar.src} alt={avatar.alt} className="shrink-0 w-9 aspect-square" />
                      ))}
                    </div>
                    <div className="flex gap-1 py-1 my-auto text-xs leading-3 text-lime-300 rounded-2xl bg-white bg-opacity-10">
                      <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/433efbc7ccb63ea0df664ac69d57569766247a0f730b848af0140554696899ae?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Used" className="shrink-0 w-5 aspect-square" />
                      <div className="my-auto">Used 0</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {icons.map((icon, index) => (
                      <Image key={index} src={icon.src} alt={icon.alt} className="shrink-0 w-9 aspect-square" />
                    ))}
                  </div>
                </div>
                dd
                {/* <div className="flex flex-col px-6 mt-16 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <Textarea className='bg-transparent'  placeholder="
                  Type your message here...
                  "/>

                  <div className="text-sm leading-6 text-ellipsis text-white text-opacity-50 max-md:max-w-full">
                  </div>
                  <div className="flex gap-5 self-end mt-14 max-md:mt-10">
                    <div className="flex flex-1 gap-1 items-center my-auto">
                      <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/e951cf1773a601bba55b764673f992cd835fc565e9ced76484f969e2ffbca487?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Send" className="shrink-0 self-stretch my-auto w-3 aspect-square" />
                      <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
                        Send
                      </div>
                      <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
                        /
                      </div>
                      <div className="flex gap-0.5 self-stretch py-1">
                        <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f04bcf58266856220f2c6eb77da27f7cebdacbafaf30a05dd340f231f92111?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="New Line 1" className="shrink-0 w-3 aspect-square" />
                        <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/eae48d7dbe183d7d24b6d8a10d75694bfdd6f0d9e3552a241732e993c94a6730?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="New Line 2" className="shrink-0 w-3 aspect-square" />
                      </div>
                      <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
                        New Line
                      </div>
                    </div>
                    <div className="flex flex-1 gap-2 text-sm leading-6 text-black whitespace-nowrap">
                      <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3ea1eb62428dc98d2d41125ea9ce730eb2f237710d9a2faf07e521fd1ccb5b1?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Avatar" className="shrink-0 w-9 border border-solid aspect-square border-zinc-800" />
                      <div className="flex gap-0 justify-between px-px">
                        <Button>Send</Button>
                        <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac4f254d1521c177485b4572ab538fd93190b11fbcfbb2507f09f2fb8c4f2a74?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Arrow" className="shrink-0 w-7 aspect-[0.78]" />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>
          </main>
          <aside className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-20 mx-auto w-full bg-black border-l border-solid border-l-zinc-800">
              <div className="flex gap-5 justify-center px-4 py-3.5 w-full shadow-sm bg-white bg-opacity-0">
                <div className="my-auto text-sm s-6 text-white">
                  Topic List
                </div>
                <div className="flex flex-1 gap-0.5">
                  <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd64f04e318451597174d92f5b46c93484c170ab177bd3fb9875a48c3cc89578?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Plus" className="shrink-0 w-6 aspect-square" />
                  <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/080df74e8da9003ff3e0bf5c3efcdb095e9d137299081f5e3e6ef24400a75ab2?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Dots" className="shrink-0 w-6 aspect-square" />
                </div>
              </div>
              <div className="flex flex-col py-px mt-1.5 w-full rounded-md border border-solid border-zinc-800">
                <div className="flex gap-0 self-end">
                  <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/25cd61f3a5342568f075cc525442849b7a0b4f36ff671e3ac1b1deaf316d4dd8?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Topic List" className="shrink-0 max-w-full aspect-[1.67] w-[200px]" />
                  <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea144d4a091d32242225603e11b68698a0d6b54f0a110090d087beac5eaa4ab7?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Close" className="shrink-0 self-start mt-2 w-6 aspect-square" />
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
                  <p className="max-md:mr-2.5">
                    topic and start a new session.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center py-2.5 pr-20 pl-3.5 mt-2 rounded-md bg-white bg-opacity-10 max-md:pr-5">
                <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bf488b3be6b782e29bf7df15adb47b802e2a3430bf7efd614f76b490bf4a84c?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Checkmark" className="shrink-0 self-stretch my-auto w-3.5 aspect-square" />
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
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc0bfeea211f49ceb57535d131460880003743096db3941181db5d94140a7025?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Just Chat" className="shrink-0 w-10 aspect-square" />
          <div className="flex flex-col self-start max-md:max-w-full">
            <div className="flex gap-2 pr-20 max-md:flex-wrap max-md:pr-5">
              <h1 className="my-auto text-sm font-bold leading-4 text-white">
                Just Chat
              </h1>
              <Badge>
                <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cd1dc918f703fff27059a8ed7e240c0bad06834e94f016c4b7188d33d321a93?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Model" className="shrink-0 self-start w-3 aspect-square" />
                <div>gpt-3.5-turbo</div>
              </Badge>
            </div>
            <p className="mt-1.5 text-xs leading-3 text-neutral-500 max-md:mr-2.5 max-md:max-w-full">
              Activate the brain cluster and spark creative thinking. Your virtual agent is here to communicate with you about everything.
            </p>
          </div>
        </div>
        <div className="flex gap-2 my-auto">
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/00accdc3d83eda4b1b7ab1399a2f4dd667e1525131b516f36e7b6c9555a60ccd?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Settings" className="shrink-0 w-9 aspect-square" />
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0396b4a071c98c81296ef0b9b115b937f9510a9eb673752aebdcca48a8f24ab?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Expand" className="shrink-0 w-9 aspect-square" />
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/411c01f8987918a21b3985589b1cd0d422db5e8ed8f6695b1a713b9452c3515b?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Close" className="shrink-0 w-9 aspect-square" />
        </div>
      </div>
      </div>
  );
}

export default MainChat