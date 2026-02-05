import { ColumnDef } from "@tanstack/react-table";
import { Stack, Typography } from "@mui/material";
import { VscEye } from "react-icons/vsc";
import Image from "next/image";
import dayjs from "dayjs";

import { useDialog } from "@/components/hooks";
import { MoreActions, StatusTag } from "@/components/common";
import { SYS_IMAGES } from "@/components/images";

export const allColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack gap={2} flexDirection='row' alignItems='center'>
          <Image 
            src={SYS_IMAGES.DefaultAvatar}
            alt="default-avatar"
            width={36}
            height={36}
          />
          <Typography fontWeight={600}>{data.name}</Typography>
        </Stack>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <Typography fontWeight={500}>{row.original.email}</Typography>,
  },
  {
    accessorKey: "workingHours",
    header: "Working Hours",
    cell: ({ row }) => {
      const data = row.original;

      const { openDialog } = useDialog();

      const handleShowAssets = () => {
        openDialog({
          type: 'dialog',
          title: `Product ${data.sku}'s Assets`,
          content: <></>,
          size: 'md',
        })
      };

      return (
        <Stack >
          <VscEye 
            onClick={handleShowAssets} 
            style={{ 
              width: '24px', 
              height: '24px',
              cursor: 'pointer',
            }} 
          />
        </Stack>
      );
    },
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => {
      return row.original.services.map((item: any, index: any) => (
          <Typography key={index} fontWeight={500}>{item}</Typography>
        ))
      
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusTag status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original?.createdAt;

      return (
        <Typography fontWeight={500}>
          {date ? dayjs(row.original?.createdAt).format('DD-MM-YYYY') : '--'}
        </Typography>
      );
    },
  },
  {
    header: 'Action',
    cell: () => {
      return (
        <MoreActions />
      );
    },
  },
];
