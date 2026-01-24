import z from "zod";
import { Stack } from "@mui/material";
import { Variants } from "motion/react";

import { NavItemType } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";

export enum CrudKeys {
  _EMAIL = 'email',
  _PASSWORD = 'password',
};

export type LoginFormValues = {
  [CrudKeys._EMAIL]: string,
  [CrudKeys._PASSWORD]: string,
};

export const initialValues = {
  [CrudKeys._EMAIL]: '',
  [CrudKeys._PASSWORD]: '',
};

export const formSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const leftNavItems: NavItemType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
];

export const rightNavItems: NavItemType[] = [
  {
    label: "Sign in",
    href: "#",
    render: () => {
      return (
        <Stack flexDirection='column' alignItems='center' gap='4px'>
          <span>Sign in</span>
          <span className="h-0.5 w-8 bg-white rounded-full" />
        </Stack>
      );
    }
  },
  {
    label: "Sign up",
    href: `${SYSTEM_PATHS.auth}?type=signup`,
    render: () => {
      return (
        <Stack style={{
          backgroundColor: '#fff',
          borderRadius: '99px',
          padding: '4px 12px'
        }}>
          <span className="text-black">Sign up</span>
        </Stack>
      );
    }
  },
];

// ------------ Animation --------------
export const navVariants: Variants = {
  hidden: { y: -100 },
  visible: { y: 0, transition: { duration: 0.2 } },
  exit: { y: -100, transition: { duration: 0.2 } }
};

export const formVariants: Variants = {
  hidden: { x: -500, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: -500, opacity: 0, transition: { duration: 0.2 } }
};
