import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { IoSparklesOutline } from "react-icons/io5";

import { SYSTEM_PATHS } from "@/src/constants/path";
import { COLOR_CODES } from "@/src/constants/color";

export const sidebarList = [
  {
    title: 'Dashboard',
    route: SYSTEM_PATHS.dashboard,
    icon: <RxDashboard size={24} color={COLOR_CODES.ICON_COLOR} />,
  },
  {
    title: 'Employee',
    route: SYSTEM_PATHS.employee,
    icon: <BsPeople size={24} color={COLOR_CODES.ICON_COLOR} />,
  },
  {
    title: 'Service',
    route: SYSTEM_PATHS.service,
    icon: <IoSparklesOutline size={24} color={COLOR_CODES.ICON_COLOR} />,
  },
  {
    title: 'Product',
    route: SYSTEM_PATHS.product,
    icon: <BsBoxSeam size={24} color={COLOR_CODES.ICON_COLOR} />,
  },
];
