
export default function Component() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="flex w-full max-w-md flex-col bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10 dark:bg-gray-800">
          <div className="mb-6 self-center text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Leave a comment
          </div>
          <div className="mt-8">
            <form action="#" autoComplete="off">
              <div className="mb-2 flex flex-col">
                <div className="relative flex ">
                  <span className="inline-flex items-center rounded-l-md border-y border-l border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      fill="currentColor"
                      height="15"
                      viewBox="0 0 1792 1792"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M704 384h512v-128h-512v128zm512 256h-512v128h512v-128zm0 256h-512v128h512v-128zm-832-256h128v-128h-128v128zm0 256h128v-128h-128v128zm0-768v128h1152v-128h-1152zm0 640h128v-128h-128v128zm0-256h128v-128h-128v128z" />
                    </svg>
                  </span>
                  <input
                    className="w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    id="sign-in-email"
                    placeholder="Your name"
                    type="text" />
                </div>
              </div>
              <div className="mb-6 flex flex-col">
                <textarea
                  className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none"
                  placeholder="Your comment"
                  style={{
                    minHeight: "100px",
                    resize: "none",
                  }} />
              </div>
              <div className="flex w-full">
                <button
                  className="hover:bg-primary-dark focus:ring-primary-dark focus:ring-offset-primary-lighter rounded-lg bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="submit"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </main></>
  )
}
