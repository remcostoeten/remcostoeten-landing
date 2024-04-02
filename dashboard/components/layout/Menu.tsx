import { Tooltip, TooltipContent, TooltipTrigger } from "@c/ui/tooltip";
import {
  CodeIcon,
  Home as HomeIcon,
  PiIcon,
  SettingsIcon,
  TextIcon,
  User2Icon,
  UserCheck2Icon,
} from "lucide-react";
import Link from "next/link";
import { IconDropdown } from "react-day-picker";

interface MenuItem {
  label: string;
  href?: string;
  icon: () => JSX.Element;
  children?: MenuItem[];
  isActive?: boolean;
}

interface MenuProps {
  items: MenuItem[];
}

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;
  const classes = `flex items-center text-base text-gray-500 hover:text-gray-900 transition-colors duration-200 ${
    item.isActive ? "text-gray-900" : ""
  }`;

  return (
    <>
      <Link href={item.href || "#"}>
        <div className={classes}>
          {item?.icon()}
          {hasChildren && <div className="ml-auto">&#8942;</div>}
        </div>
      </Link>

      {hasChildren && (
        <ul className="pl-4 mt-2">
          {item.children?.map((child) => (
            <MenuItemComponent key={child.label} item={child} />
          ))}
        </ul>
      )}
    </>
  );
};

const Menu = ({ items }: MenuProps) => {
  return (
    <div className="flex flex-col items-center space-y-8 h-full">
      {items.map((item) => (
        <Tooltip key={item.label}>
          <TooltipTrigger>
            <MenuItemComponent item={item} />
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

const icons = {
  home: <HomeIcon />,
  profile: <User2Icon />,
  account: <UserCheck2Icon />,
  settings: <SettingsIcon />,
  Projectts: <IconDropdown />,
  kanban: <PiIcon />,
  "python-scraper": <CodeIcon />,
  snippets: <TextIcon />,
};

const allRoutes = [
  "home",
  "profile",
  "account",
  "settings",
  "Projectts",
  "kanban",
  "python-scraper",
  "snippets",
].map((route) => ({
  label: route.charAt(0).toUpperCase() + route.slice(1),
  href: `/${route}`,
  icon: () => icons[route],
}));

export default function MenuContainer() {
  return <Menu items={allRoutes} />;
}
