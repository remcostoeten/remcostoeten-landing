import { useMDXComponent } from "@/core/hooks/useMdx"
import MDXComponents from "@/MDXComponents"

const Blog = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code)

  return (
    <div className="prose prose-dark w-full max-w-none">
      <Component components={{ ...MDXComponents }} />
    </div>
  )
}

export default Blog
