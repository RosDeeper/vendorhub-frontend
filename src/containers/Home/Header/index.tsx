'use client';

import { Stack, Typography } from "@mui/material";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";
import { LogOut } from "lucide-react";

import { TEXT_SIZE } from "@/src/constants/text";
import { Divider } from "@/components/common";
import { SYS_PATHS, SYS_TYPE } from "@/src/constants/path";
import { SYS_IMAGES } from "@/components/images";
import { protocol, rootDomain, Toastify } from "@/lib";
import { useLogout } from "@/src/queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const loginUrl = `${protocol}://${rootDomain}${SYS_PATHS.auth}?type=${SYS_TYPE.LOGIN}`;

  const { mutate: logout, isLoading: isLoggingOut } = useLogout({
    onSuccess() {
      Toastify.success("Đăng xuất thành công.");
      window.location.href = loginUrl;
    },
    onError() {
      Toastify.error("Đăng xuất thất bại. Thử lại.");
    },
  });

  return (
    <Stack className="header-container">
      <Link href={SYS_PATHS.dashboard}>
        <Image 
          src={SYS_IMAGES.VendorWhiteLogo}
          alt="VendorHub Logo"
          width={160}
          height={16}
        />
      </Link>
      <Stack direction='row' alignItems='center' gap={2} className="h-8">
        <LuMessageSquareText size={20} color="#FFFFFF" />
        <FaRegBell size={20} color="#FFFFFF" />

        <Divider orientation='vertical' bgColor="#fff" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Stack 
              direction='row' 
              alignItems='center' 
              gap={2} 
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Image 
                src={SYS_IMAGES.DefaultAvatar}
                alt="default-avatar"
                width={36}
                height={36}
              />
              <Typography 
                color="#FFFFFF"
                fontSize={TEXT_SIZE.SM}
              >
                coolseller
              </Typography>
              <FaCaretDown size={16} color="#FFFFFF" />
            </Stack>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              variant="destructive"
              onClick={() => logout()}
              disabled={isLoggingOut}
            >
              <LogOut className="size-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Stack>
    </Stack>
  );
};

export default Header;
