import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { SYS_PATHS } from "@/src/constants/path";

const X = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: SYS_PATHS.dashboard },
  ];

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
