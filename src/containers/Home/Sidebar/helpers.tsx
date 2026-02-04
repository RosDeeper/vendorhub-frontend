import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { IoSparklesOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi2";

import { SYS_PATHS } from "@/src/constants/path";

export const sidebarList = [
  {
    title: 'Dashboard',
    route: SYS_PATHS.dashboard,
    icon: RxDashboard,
  },
  {
    title: 'Staff',
    route: SYS_PATHS.staff,
    icon: BsPeople,
  },
  {
    title: 'Service',
    route: SYS_PATHS.service,
    icon: IoSparklesOutline,
  },
  // {
  //   title: 'Booking',
  //   route: SYS_PATHS.booking,
  //   icon: <LuCalendarDays size={24} color={COLOR_CODES.ICON_COLOR} />,
  // },
  // {
  //   title: 'Payment',
  //   route: SYS_PATHS.payment,
  //   icon: <HiOutlineCreditCard size={24} color={COLOR_CODES.ICON_COLOR} />,
  // },
  // {
  //   title: 'Voucher',
  //   route: SYS_PATHS.voucher,
  //   icon: <MdOutlineDiscount size={24} color={COLOR_CODES.ICON_COLOR} />,
  // },
  // {
  //   title: 'Product',
  //   route: SYS_PATHS.product,
  //   icon: <BsBoxSeam size={24} color={COLOR_CODES.ICON_COLOR} />,
  // },
];
