import { Stack, Typography } from "@mui/material";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";

import { DefaultAvatar } from "@/components/images";
import { TEXT_SIZE } from "@/src/constants/text";
import { Divider } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";

const Header = () => {
  return (
    <Stack className="header-container">
      <Link href={SYSTEM_PATHS.dashboard}>
        <Image 
          src='/assets/vendor-black.png'
          alt="VendorHub Logo"
          width={160}
          height={16}
        />
      </Link>
      <Stack direction='row' alignItems='center' gap={2} className="h-8">
        <LuMessageSquareText size={20} color="#584700" />
        <FaRegBell size={20} color="#584700" />

        <Divider orientation='vertical' />

        <Stack direction='row' alignItems='center' gap={2}>
          <DefaultAvatar />
          <Typography 
            color="#3F434A"
            fontSize={TEXT_SIZE.SM}
          >
            coolseller
          </Typography>
          <FaCaretDown size={16} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
