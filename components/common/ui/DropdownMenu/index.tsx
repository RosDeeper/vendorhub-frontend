import { ReactNode } from 'react';
import Link from 'next/link';

import { 
  DropdownMenu as LibDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './lib-ui';

export type DropdownItemType = {
  label?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean;
};

type DropdownMenuProps = {
  trigger: ReactNode;
  items: DropdownItemType[];
  align?: "start" | "center" | "end"
};

export const DropdownMenu = ({
  trigger,
  items,
  align = 'end',
}: DropdownMenuProps) => {
  return (
    <LibDropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {items.map((it, index) => {
          if (it.separator) {
            return <DropdownMenuSeparator key={index} />
          }
          if (it.href) {
            return (
              <DropdownMenuItem
                asChild
                key={index}
                variant={it.variant}
                disabled={it.disabled}
              >
                <Link href={it.href}>{it.label}</Link>
              </DropdownMenuItem>
            );
          }
          return (
            <DropdownMenuItem
              key={index}
              onClick={it.onClick}
              variant={it.variant}
              disabled={it.disabled}
            >
              {it.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </LibDropdownMenu>
  );
};
