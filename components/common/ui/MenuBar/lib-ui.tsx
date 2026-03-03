import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Menubar = ({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) => {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-white flex h-10 items-center rounded-xl w-fit overflow-hidden",
        className
      )}
      {...props}
    />
  );
};

const MenubarMenu = ({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) => {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
};

const MenubarGroup = ({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) => {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
};

const MenubarPortal = ({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
};

const MenubarRadioGroup = ({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) => {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
};

const MenubarTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) => {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "data-[state=open]:bg-[#2c3e50] pt-2.5! pb-2.5! pl-4! pr-4!",
        "flex items-center data-[state=open]:text-white font-base",
        "text-sm font-medium cursor-pointer",
        className
      )}
      {...props}
    />
  );
};

const MenubarContent = ({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) => {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-white data-[state=open]:animate-in",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 min-w-48 origin-(--radix-menubar-content-transform-origin)",
          "overflow-hidden rounded-xl shadow-md ",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  );
};

const MenubarItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) => {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "flex relative cursor-pointer items-center gap-2",
        "text-sm outline-hidden select-none data-disabled:pointer-events-none",
        "data-disabled:opacity-50 [&_svg]:pointer-events-none",
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "pt-2! pb-2! pl-3! pr-3! font-base hover:bg-[#2c3e50] hover:text-white",
        className
      )}
      {...props}
    />
  );
};

const MenubarCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) => {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-pointer pt-2! pb-2! pl-3! pr-3!",
        "items-center gap-2 text-sm font-base hover:bg-[#2c3e50] hover:text-white",
        "select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
};

const MenubarRadioItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) => {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default",
        "items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden",
        "select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
};

const MenubarLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) => {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-inset:pl-8",
        className
      )}
      {...props}
    />
  );
};

const MenubarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) => {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-[#2c3e50] h-[1.5px]", className)}
      {...props}
    />
  );
};

const MenubarShortcut = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
};

const MenubarSub = ({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const MenubarSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) => {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-pointer items-center gap-2",
        "text-sm select-none data-[state=open]:bg-[#2c3e50]",
        'data-[state=open]:text-white',
        "pt-2! pb-2! pl-3! pr-3! font-base",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
};

const MenubarSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) => {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "data-[state=open]:animate-in bg-white",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
        "data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32",
        "origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-xl shadow-md",
        className
      )}
      {...props}
    />
  );
};

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
