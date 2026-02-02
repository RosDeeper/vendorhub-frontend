import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";

const X = () => {
  const breadcrumbItems = [
    { label: "Booking Management", href: "/booking" },
  ];

  return (
    <Stack gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
