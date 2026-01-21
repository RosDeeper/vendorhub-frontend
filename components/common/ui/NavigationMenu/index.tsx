import { ReactNode } from "react";
import Link from "next/link";

import { 
  NavigationMenu as LibNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, 
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./lib-ui";
import { cn } from "@/lib";

export type NavItemType = {
  label: string,
  href?: string,
  children?: NavItemType[],
  render?: (item: NavItemType) => ReactNode;
};

const NavigationItem = ({ item }: { item: NavItemType }) => {
  if (item.render) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href={item.href ?? "#"}
            className={cn("text-base text-white")}
          >
            {item.render(item)}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          {item.label}
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <ul className="w-[120]">
            {item.children.map((child) => (
              <NavigationMenuLink asChild key={child.label}>
                <Link
                  href={child.href ?? "#"}
                  className={cn("text-base text-white")}
                  style={{ padding: '8px 0' }}
                >
                  {child.label}
                </Link>
              </NavigationMenuLink>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.href ?? "#"}
          className={cn("px-4 py-2 text-base text-white")}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

type NavigationMenuProps = {
  items: NavItemType[],
};

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
  return (
    <LibNavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationItem key={item.label} item={item} />
        ))}
      </NavigationMenuList>
    </LibNavigationMenu>
  );
};
