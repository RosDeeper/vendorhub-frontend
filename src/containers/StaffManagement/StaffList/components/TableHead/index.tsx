import { Stack } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

import { Input, Button } from "@/components/common";
import { useDialog } from "@/components/hooks";
import FilterForm from "../FilterForm";

const TableHead = () => {
  const { openDialog } = useDialog();

  const handleOpenFilter = () => {
    openDialog({
      type: 'drawer',
      content: <FilterForm />,
    });
  };

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Input 
        placeholder="Search staff's name, email"
        startIcon={<IoIosSearch style={{ width: '20px', height: '20px' }} />}
        style={{ width: '350px' }}
        variant='light'
      />

      <div className="flex items-center gap-6">
        <Button 
          className="w-20 text-sm!" 
          variant='ghost'
          onClick={handleOpenFilter}
          label='Filter'
          startIcon={<BiFilterAlt style={{ width: '20px', height: '20px' }} />}
          style={{ width: '100px', borderRadius: '12px' }}
        />
        <Button 
          label="Add"
          style={{ width: '100px', borderRadius: '12px' }}
          endIcon={<FiPlusCircle style={{ width: '20px', height: '20px' }} />}
        />
      </div>
    </Stack>
  );
};

export default TableHead;
