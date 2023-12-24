import MDXComponents from "@/components/blog/MDXComponents";
import { useMDXComponent } from "next-contentlayer/hooks";

const Blog = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-dark w-full max-w-none">
      <Component components={{ ...MDXComponents }} />
    </div>
  );
};

export default Blog;
