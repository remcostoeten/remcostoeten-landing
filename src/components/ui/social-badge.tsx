import { Badge } from "./badge";

export default function SocialBadge({
  children,
  link,
  mail,
  external,
}: {
  children: React.ReactNode;
  link?: string;
  mail?: boolean;
  external?: boolean;
}) {
  const Wrapper = link ? "a" : "span";

  return (
    <Wrapper
      href={link || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="social-badge flex-col-reverse items-start md:flex-row md:items-center"
    >
      <Badge
        variant="secondary"
        className="justify-end hover:bg-inherit/50 hover:scale-150 transition-transform duration-200 ease-in-out"
      >
        {children}
      </Badge>
    </Wrapper>
  );
}
1;
