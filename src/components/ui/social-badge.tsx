import { Badge } from "./badge";

export default function SocialBadge({ children }) {
  return (
    <span className="flex-col-reverse items-start md:flex-row md:items-center">
      <Badge
        variant="secondary"
        className="justify-end hover:bg-inherit/50 hover:scale-150 transition-transform duration-200 ease-in-out"
      >
        {children}
      </Badge>
    </span>
  );
}
