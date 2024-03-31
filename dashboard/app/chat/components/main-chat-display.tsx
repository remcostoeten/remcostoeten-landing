export default function CommentSection() {

  return (

<section className="flex flex-col justify-center px-4 py-20 tracking-wide text-white max-md:pr-5 max-md:max-w-full">
  <div className="flex gap-3 items-start mt-6 mb-80 max-md:flex-wrap max-md:mb-10">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bfc0c23759211747cf382e25841f88fb2a9402074148602cd916ba95b451ec0?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&" alt="Agent avatar" classNameNQ="shrink-0 w-10 aspect-square" />
    <div className="flex flex-col grow shrink-0 justify-center py-4 pr-11 pl-3.5 rounded-lg basis-0 bg-white bg-opacity-10 w-fit max-md:pr-5 max-md:max-w-full">
      <p className="text-sm leading-6 max-md:max-w-full">
        Hello, I'm your virtual agent. You can ask me anything, and I'll do my best to answer you. If you
      </p>
      <div className="flex gap-2 mt-1 max-md:flex-wrap">
        <p className="flex-auto my-auto text-sm leading-6">
          need a more professional or customized agent, click on
        </p>
        <div className="flex gap-1">
          <button className="justify-center py-2 text-xs leading-3 whitespace-nowrap rounded border border-solid bg-white bg-opacity-10 border-zinc-800" onClick={handleCreateAgent}>
            +
          </button>
          <p className="flex-auto my-auto text-sm leading-6">
            to create a custom agent.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  )}