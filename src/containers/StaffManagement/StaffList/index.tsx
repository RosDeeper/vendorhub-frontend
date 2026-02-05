'use client';

import { useMemo } from "react";
import { motion } from "motion/react";

import { Table } from "@/components/common";
import { allColumns } from "./allColumns";
import { mock } from "./components/helpers";
import TableHead from "./components/TableHead";

const StaffList = () => {
  const columns = useMemo(() => {
    return allColumns();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Table
        data={mock}
        totalRecord={mock.length}
        columns={columns}
        tableHead={<TableHead />}
      />
    </motion.div>
  );
};

export default StaffList;
