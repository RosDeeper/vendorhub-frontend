import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { ProductList } from "@/src/containers/ProductManagement";

const X = async () => {
  const breadcrumbItems = [
    { label: "Booking Management", href: "/booking" },
  ];

  return (
    <Stack gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductList />
    </Stack>
  );
};

export default X;
