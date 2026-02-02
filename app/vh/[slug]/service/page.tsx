import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";

const X = () => {
  const breadcrumbItems = [
    { label: "Service Management", href: "/service" },
  ];

  return (
    <Stack gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
