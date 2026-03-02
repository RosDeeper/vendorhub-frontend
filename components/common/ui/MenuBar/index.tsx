import { 
  Menubar, 
  MenubarCheckboxItem, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarSub, 
  MenubarSubContent, 
  MenubarSubTrigger, 
  MenubarTrigger 
} from "./lib-ui";

type MenubarItemConfig = {
  label: string;
  onClick?: () => void;
  inset?: boolean;
  disabled?: boolean;
  type?: "item" | "checkbox" | "radio" | "separator" | "sub"
  checked?: boolean;
  children?: MenubarItemConfig[];
};

export type MenubarMenuConfig = {
  trigger: string;
  items: MenubarItemConfig[];
};

type AppMenubarProps = {
  data: MenubarMenuConfig[];
  className?: string;
};

const renderMenuItem = (item: MenubarItemConfig, index: number) => {
  if (item.type === "separator") {
    return <MenubarSeparator key={index} />;
  }

  if (item.type === "sub" && item.children) {
    return (
      <MenubarSub key={index}>
        <MenubarSubTrigger inset={item.inset}>{item.label}</MenubarSubTrigger>
        <MenubarSubContent>
          {item.children.map((subItem, subIdx) => renderMenuItem(subItem, subIdx))}
        </MenubarSubContent>
      </MenubarSub>
    );
  }
  
  if (item.type === "checkbox") {
    return (
      <MenubarCheckboxItem
        key={index}
        checked={item.checked}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        {item.label}
      </MenubarCheckboxItem>
    );
  }

  return (
    <MenubarItem
      key={index}
      onClick={item.onClick}
      disabled={item.disabled}
      inset={item.inset}
    >
      {item.label}
    </MenubarItem>
  );
};

export const MenuBar = ({ data, className }: AppMenubarProps) => {
  return (
    <Menubar className={className}>
      {data.map((menu, menuIdx) => (
        <MenubarMenu key={menuIdx}>
          <MenubarTrigger>{menu.trigger}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, itemIdx) => renderMenuItem(item, itemIdx))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};
