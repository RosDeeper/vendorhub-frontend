import { Stack } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

import { Input, Button } from "@/components/common";
import { useDialog } from "@/components/hooks";
import FilterForm from "../FilterForm";
import AddStaff from "../AddStaff";

const TableHead = () => {
  const { openDialog } = useDialog();

  const handleOpenFilter = () => {
    openDialog({
      type: 'drawer',
      content: <FilterForm />,
    });
  };

  const handleAddStaff = () => {
    openDialog({
      type: 'dialog',
      title: 'Add new staff',
      content: <AddStaff />,
      size: 'lg'
    });
  };

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Input 
        placeholder="Search staff's name, email"
        startIcon={<IoIosSearch size={20} />}
        style={{ width: '350px' }}
        variant='light'
      />

      <div className="flex items-center gap-6">
        <Button 
          variant='ghost'
          label='Filter'
          onClick={handleOpenFilter}
          startIcon={<BiFilterAlt size={20} />}
          style={{ width: '100px' }}
        />
        <Button 
          label="Add"
          onClick={handleAddStaff}
          endIcon={<FiPlusCircle size={20} />}
          style={{ width: '100px' }}
        />
      </div>
    </Stack>
  );
};

export default TableHead;
