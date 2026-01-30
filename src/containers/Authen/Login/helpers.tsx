import z from "zod";
import { Stack } from "@mui/material";

import { NavItemType } from "@/components/common";
import { SYS_PATHS, SYS_TYPE } from "@/src/constants/path";

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
    href: `${SYS_PATHS.auth}?type=${SYS_TYPE.SIGN_UP}`,
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
