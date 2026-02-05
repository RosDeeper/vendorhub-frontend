import { Stack } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

type Props = {
  onEdit?: () => void,
  onDelete?: () => void,
};

export const MoreActions = ({ onEdit, onDelete }: Props) => {
  return (
    <Stack flexDirection='row' gap={2} alignItems='center'>
      <FiEdit2 
        style={{
          width: '20px',
          height: '20px',
          color: '#3498DB',
          cursor: 'pointer'
        }} 
        onClick={onEdit}
      />
      <FaRegTrashAlt 
        style={{
          width: '20px',
          height: '20px',
          color: '#FF383C',
          cursor: 'pointer'
        }} 
        onClick={onDelete}
      />
    </Stack>
  );
};
