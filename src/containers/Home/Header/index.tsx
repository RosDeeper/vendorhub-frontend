import { Stack, Typography } from "@mui/material";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";

import { TEXT_SIZE } from "@/src/constants/text";
import { Divider } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";
import { IMAGES } from "@/components/images";

const Header = () => {
  return (
    <Stack className="header-container">
      <Link href={SYS_PATHS.dashboard}>
        <Image 
          src={IMAGES.VendorWhiteLogo}
          alt="VendorHub Logo"
          width={160}
          height={16}
        />
      </Link>
      <Stack direction='row' alignItems='center' gap={2} className="h-8">
        <LuMessageSquareText size={20} color="#FFFFFF" />
        <FaRegBell size={20} color="#FFFFFF" />

        <Divider orientation='vertical' bgColor="#fff" />

        <Stack direction='row' alignItems='center' gap={2}>
          <Image 
            src={IMAGES.DefaultAvatar}
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
      </Stack>
    </Stack>
  );
};

export default Header;
