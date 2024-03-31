import React from "react";

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="shrink-0 w-9 aspect-square"
  />
);

const images = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6e2f12aa623f097decbf558abd8299fbf7bc011f7f83646d6d22616c736cd98?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/33935a99691dc4932cea6dd6f5f563a241045b31a8b985677481e7f2f6bdcc8e?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3728321f042cd78743cff1e1e5eef628aa35a5113f091d6dac947808bb1679d1?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/50c755d5f4757dab3789d6980d220340cf740176ac54fc72de97ab42322b3bb4?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 4",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f483fdadb007527c73fb59bc240866790e0bf3db08eed54a3660d5e5e749135f?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 5",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb5b95d4379852e6f0a849255f413bf2db983708b4ebd0e556810cfc5a9aeeaa?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 6",
  },
];

const CommentSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center py-4 border-t border-solid border-zinc-800 max-md:max-w-full">
      <div className="flex gap-0 px-4 max-md:flex-wrap">
        <div className="flex gap-3 pr-20 max-md:flex-wrap">
          <div className="flex gap-1">
            {images.map((image, index) => (
              <Image key={index} src={image.src} alt={image.alt} />
            ))}
          </div>
          <div className="flex gap-1 py-1 my-auto text-xs leading-3 text-lime-300 rounded-2xl bg-white bg-opacity-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/433efbc7ccb63ea0df664ac69d57569766247a0f730b848af0140554696899ae?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
              alt="Used 0 icon"
              className="shrink-0 w-5 aspect-square"
            />
            <div className="my-auto">Used 0</div>
          </div>
        </div>
        <div className="flex gap-1">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f8a78d502feae12c5c526ae79b162fabc146847edba0946fad34ef5fc2bedd6?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
            alt="Image 7"
            className="shrink-0 w-9 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2d5b13076fea0ffcbdb1a585c3e4b3cc532e8e34243661a02c34aefda82871?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
            alt="Image 8"
            className="shrink-0 w-9 aspect-square"
          />
        </div>
      </div>
      <div className="flex flex-col px-6 mt-16 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="text-sm leading-6 text-ellipsis text-white text-opacity-50 max-md:max-w-full">
          Type your message here...
        </div>
        <div className="flex gap-5 self-end mt-14 max-md:mt-10">
          <div className="flex flex-1 gap-1 items-center my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e951cf1773a601bba55b764673f992cd835fc565e9ced76484f969e2ffbca487?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
              alt="Send icon"
              className="shrink-0 self-stretch my-auto w-3 aspect-square"
            />
            <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
              Send
            </div>
            <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
              /
            </div>
            <div className="flex gap-0.5 self-stretch py-1">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f04bcf58266856220f2c6eb77da27f7cebdacbafaf30a05dd340f231f92111?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                alt="Shift icon"
                className="shrink-0 w-3 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eae48d7dbe183d7d24b6d8a10d75694bfdd6f0d9e3552a241732e993c94a6730?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                alt="Enter icon"
                className="shrink-0 w-3 aspect-square"
              />
            </div>
            <div className="self-stretch my-auto text-xs leading-5 text-neutral-500">
              New Line
            </div>
          </div>
          <div className="flex flex-1 gap-2 text-sm leading-6 text-black whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3ea1eb62428dc98d2d41125ea9ce730eb2f237710d9a2faf07e521fd1ccb5b1?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
              alt="Profile image"
              className="shrink-0 w-9 border border-solid aspect-square border-zinc-800"
            />
            <div className="flex gap-0 justify-between px-px">
              <button className="justify-center px-4 py-3.5 rounded-md bg-zinc-100">
                Send
              </button>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac4f254d1521c177485b4572ab538fd93190b11fbcfbb2507f09f2fb8c4f2a74?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
                alt="Send icon"
                className="shrink-0 w-7 aspect-[0.78]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
