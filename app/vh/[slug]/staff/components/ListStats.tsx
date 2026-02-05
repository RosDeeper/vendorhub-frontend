'use client';

import { Grid } from "@mui/material";
import { FiUsers, FiUserCheck, FiUserPlus, FiUserX } from "react-icons/fi";

import { StatCard } from "@/components/common";

export const ListStats = () => {
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Total Staffs"
          data={100}
          icon={FiUsers}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Active Staffs"
          data={80}
          variant='success'
          icon={FiUserCheck}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Inactive Staffs"
          data={24}
          variant='warning'
          icon={FiUserX}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="New Staffs"
          data={20}
          variant='info'
          icon={FiUserPlus}
        />
      </Grid>
    </Grid>
  );
};
