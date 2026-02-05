import { Stack, Typography } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";
import { COLOR_CODES } from "@/src/constants/color";
import { ListStats } from "./components";
import { StaffList } from "@/src/containers/StaffManagement";

const X = () => {
  const breadcrumbItems = [
    { label: "Staff", href: SYS_PATHS.staff },
  ];

  return (
    <Stack gap={1}>
      <Breadcrumbs items={breadcrumbItems} />
      <Typography style={{
        fontWeight: 700,
        fontSize: '20px',
        color: COLOR_CODES.PRIMARY_COLOR
      }}>
        Staff Management
      </Typography>

      <ListStats />
      
      <StaffList />
    </Stack>
  );
};

export default X;
