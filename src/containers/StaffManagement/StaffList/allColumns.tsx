import { ColumnDef } from "@tanstack/react-table";
import { Stack, Typography } from "@mui/material";
import { VscEye } from "react-icons/vsc";
import Image from "next/image";

import { useDialog } from "@/components/hooks";
import { MoreActions, StatusTag } from "@/components/common";
import { SYS_IMAGES } from "@/components/images";
import DeleteStaff from "./components/DeleteStaff";
import { formatTimestamp } from "@/lib";

import { StaffResponse } from "@/src/queries/types";

export const allColumns = (): ColumnDef<StaffResponse>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack gap={2} flexDirection='row' alignItems='center'>
          <Image 
            src={data?.avatar_url ?? SYS_IMAGES.DefaultAvatar}
            alt="default-avatar"
            width={36}
            height={36}
          />
          <Typography fontWeight={600}>{data?.fullName}</Typography>
        </Stack>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => <Typography fontWeight={500}>{row.original?.phoneNumber ?? '--'}</Typography>,
  },
  {
    accessorKey: "workingHours",
    header: "Working Hours",
    cell: ({ row }) => {
      const { openDialog } = useDialog();
      const data = row.original;

      const handleShowAssets = () => {
        openDialog({
          type: 'dialog',
          title: `Product ${data.workingHour}'s Assets`,
          content: <></>,
          size: 'md',
        })
      };

      return (
        <Stack >
          {data?.workingHour ? (
            <VscEye 
              onClick={handleShowAssets} 
              style={{ 
                width: '24px', 
                height: '24px',
                cursor: 'pointer',
              }} 
            />
          ) : '--'}
        </Stack>
      );
    },
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => {
      const data = row.original;

      return data?.services ? (
        data?.services.map((item: any, index: any) => (
          <Typography key={index} fontWeight={500}>{item}</Typography>
        ))
      ) : '--';
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <StatusTag status={data?.isActive ? 'active' : 'inactive'} />
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Typography fontWeight={500}>
          {formatTimestamp(data?.createdAt)}
        </Typography>
      );
    },
  },
  {
    header: 'Action',
    cell: () => {
      const { openDialog } = useDialog();

      const handleDeleteStaff = () => {
        openDialog({
          type: 'alert',
          content: <DeleteStaff />,
          size: 'sm',
        })
      };

      return (
        <MoreActions 
          onDelete={handleDeleteStaff}
        />
      );
    },
  },
];
