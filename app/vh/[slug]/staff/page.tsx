import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";

const X = () => {
  const breadcrumbItems = [
    { label: "Staff", href: SYS_PATHS.staff },
  ];

  return (
    <Stack gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
