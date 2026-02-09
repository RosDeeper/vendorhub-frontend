'use client';

import { Grid } from "@mui/material";
import { TbHeartHandshake } from "react-icons/tb";
import { MdOutlineLock } from "react-icons/md";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

import { StatCard } from "@/components/common";

const ServiceStat = () => {
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Total Services"
          data={100}
          icon={TbHeartHandshake}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Active Services"
          data={80}
          variant='success'
          icon={FiCheckCircle}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Inactive Services"
          data={24}
          variant='warning'
          icon={MdOutlineLock}
        />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <StatCard 
          title="Deleted Services"
          data={20}
          variant='danger'
          icon={FiTrash2}
        />
      </Grid>
    </Grid>
  );
};

export default ServiceStat;
