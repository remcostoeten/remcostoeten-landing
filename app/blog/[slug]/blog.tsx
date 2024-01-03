import MDXComponents from "@/MDXComponents"

import { useMDXComponent } from "@/core/hooks/useMdx"

const Blog = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code)

  return (
    <div className="prose prose-dark w-full max-w-none">
      <Component components={{ ...MDXComponents }} />
    </div>
  )
}

export default Blog
