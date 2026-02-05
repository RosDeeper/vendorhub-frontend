export const STATUS_CONFIG = {
  active: {
    label: "Active",
    color: "#2ECC71",
    bgColor: "#BEEFD3",
  },
  inactive: {
    label: "Inactive",
    color: "#FF8D28",
    bgColor: "#FBE0B6",
  },
} as const;

export type StatusType = keyof typeof STATUS_CONFIG;
