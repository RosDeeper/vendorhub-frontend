'use client';

import { useMemo } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

import { Table } from "@/components/common";
import { allColumns } from "./allColumns";
import TableHead from "./components/TableHead";

import { useGetStaffList } from "@/src/queries";

const StaffList = () => {
  const query = useSearchParams();
  const currentPage = query.get('page');

  const { staffList, totalStaff, isLoading, setParams } = useGetStaffList(
    { page: Number(currentPage) || 1 }
  );
 
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
        data={staffList}
        totalRecord={totalStaff}
        columns={columns}
        isLoading={isLoading}
        tableHead={<TableHead />}
        onAction={(p: number) => setParams({ page: p })}
      />
    </motion.div>
  );
};

export default StaffList;
