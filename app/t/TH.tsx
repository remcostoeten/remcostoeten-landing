import * as React from "react";

interface MenuItemProps {
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return <div className="self-stretch my-auto">{children}</div>;
};

interface ButtonProps {
  icon: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, children }) => {
  return (
    <div className="flex gap-1 justify-center self-stretch px-3 py-2.5 rounded-full shadow-sm bg-zinc-800 bg-opacity-40">
      <img loading="lazy" src={icon} alt="" className="shrink-0 w-3.5 aspect-square" />
      <div>{children}</div>
    </div>
  );
};

const Th: React.FC = () => {
  const menuItems = [
    { label: "Home" },
    { label: "Pricing" },
    { label: "Security" },
  ];

  return (
    <header className="flex gap-5 justify-between items-center px-5 text-sm font-medium leading-6 max-md:flex-wrap">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee4bce3530bf6623eb1c4b3fef6acf95d908d2a9b24b8132df0a6317a3f57aef?apiKey=23e3818925ea49a383f80216e106a39d&" alt="Logo" className="shrink-0 self-stretch w-32 max-w-full aspect-[2.56]" />

      <nav className="flex gap-5 justify-between items-center self-stretch my-auto text-zinc-400 max-md:flex-wrap">
        {menuItems.map((item, index) => (
          <MenuItem key={index}>{item.label}</MenuItem>
        ))}

        <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/cf6b3083839b6d2d26f1b563277196b5b35e5d09848283788a06a79dd3b9e7a8?apiKey=23e3818925ea49a383f80216e106a39d&">Star us on GitHub</Button>
        <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/302563c306522a1b72ba3b1e6e3c68e0e63a2368dc0b0517da805c4220843fa8?apiKey=23e3818925ea49a383f80216e106a39d&">Join our Slack</Button>
      </nav>

      <div className="flex gap-5 justify-between self-stretch my-auto">
        <div className="justify-center px-3 py-3 whitespace-nowrap rounded-full shadow-sm bg-zinc-800 bg-opacity-40 text-zinc-400">
          Docs
        </div>
        <div className="justify-center px-3 py-2.5 text-emerald-400 rounded-full shadow-sm bg-emerald-400 bg-opacity-10">
          Sign in
        </div>
      </div>
    </header>
  );
};

export default Th;