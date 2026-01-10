'use client';

import { Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { FONT_WEIGHT } from "@/src/constants/text";
import { useSidebar } from "@/components/hooks";
import { sidebarList } from "./helpers";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const { isCollapsed, toggleSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState(pathname);

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  
  return (
    <Stack>
      <Stack 
        className="sidebar-container"
        style={{
          width: isCollapsed ? '80px' : '200px',
        }}
      >
        {sidebarList.map((item, index) => {
          const isActive = activeRoute.startsWith(item.route);

          return (
            <Stack 
              key={index} 
              className="sidebar-item"
              gap={2}
              style={{
                backgroundColor: isActive
                  ? "var(--background-normal)"
                  : "transparent",
                transform: isActive ? "translateX(0)" : "translateX(-4px)",
              }}
              onClick={() => {
                setActiveRoute(item.route); 
                router.push(item.route);
              }}
            >
              {item.icon}
              {!isCollapsed &&  (
                <Typography
                  fontWeight={FONT_WEIGHT.BOLD}
                  letterSpacing={1}
                  color="#584700"
                >
                  {item.title}
                </Typography>
              )}
            </Stack>
          );
        })}

        <Stack
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="collapse-button"
        >
          {isCollapsed ? <FaCaretRight size={20} /> : <FaCaretLeft size={20} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
