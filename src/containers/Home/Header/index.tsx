import { Stack, Typography } from "@mui/material";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";

import { TEXT_SIZE } from "@/src/constants/text";
import { Divider, DropdownMenu, DropdownItemType } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";
import { SYS_IMAGES } from "@/components/images";

const Header = () => {
  const handleLogout = () => {};

  const items: DropdownItemType[] = [
    { label: 'Profile' },
    { label: 'Settings' },
    { separator: true },
    { label: 'Logout', variant: 'destructive', onClick: handleLogout }
  ];

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

        <Stack direction='row' alignItems='center' gap={1.5}>
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
          
          <DropdownMenu 
            trigger={<FaCaretDown size={20} color="#FFFFFF" />}
            items={items}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
