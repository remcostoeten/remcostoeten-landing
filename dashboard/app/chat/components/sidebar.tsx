import * as React from "react";
import Image from "next/image";

const images = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbd1cbc3d75be47bda51d1638d31ac1809a97351a131058feb16ec47afae415a?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 1",
    className: "w-11 aspect-[0.29]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ea390d5fbcb672d09add4e8d585f8513866db3931b9c88085f0fef8d881bf73c?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 2",
    className: "w-11 aspect-[1.22] mt-[600px] max-md:mt-10",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0cc53066f4f88d423e0a7f6e7976d68ef538dc38263cdb864897f499a8e98c5b?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 3",
    className: "mt-1 w-11 aspect-[1.22]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/072b4c794b6fb740efdf0d20224eb8565c71dc044a9b5653d02843ca91092f48?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&",
    alt: "Image 4",
    className: "mt-1 w-11 aspect-[1.22]",
  },
];

const ChatSidebar = () => {
  return (
    <aside className="flex flex-col justify-center items-center px-2.5 py-4 border-r border-solid bg-neutral-900 border-r-zinc-800 max-md:hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className={image.className}
          width={44}
          height={44}
        />
      ))}
    </aside>
  );
};

export default ChatSidebar;
