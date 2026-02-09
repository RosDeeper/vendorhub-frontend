import { Stack, Typography } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";
import { COLOR_CODES } from "@/src/constants/color";
import { ServiceStat } from "@/src/containers/ServiceManagement";

const X = () => {
  const breadcrumbItems = [
    { label: "Service", href: SYS_PATHS.service },
  ];

  return (
    <Stack gap={1}>
      <Breadcrumbs items={breadcrumbItems} />
      <Typography style={{
        fontWeight: 700,
        fontSize: '20px',
        color: COLOR_CODES.PRIMARY_COLOR
      }}>
        Service Management
      </Typography>

      <ServiceStat />
    </Stack>
  );
};

export default X;
