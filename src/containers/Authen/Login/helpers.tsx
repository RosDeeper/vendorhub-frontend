import z from "zod";
import { Stack } from "@mui/material";
import { Variants } from "motion/react";

import { NavItemType } from "@/components/common";

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
    label: "English",
    href: "#",
    children: [
      {
        label: "Vietnamese",
        href: "#",
      },
    ]
  },
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
    label: "Register",
    href: "#",
    render: () => {
      return (
        <Stack style={{
          backgroundColor: '#fff',
          borderRadius: '99px',
          padding: '4px 12px'
        }}>
          <span className="text-black">Register</span>
        </Stack>
      );
    }
  },
];

// ------------ Animation --------------
export const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
};

export const formVariants: Variants = {
  hidden: { opacity: 0, x: -1000 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  }
};
