import { Stack, Typography } from "@mui/material";

import { useDialog } from "@/components/hooks";
import { Button } from "@/components/common";
import { COLOR_CODES } from "@/src/constants/color";

const DeleteStaff = () => {
  const { closeDialog } = useDialog();

  return (
    <Stack>
      <Typography sx={{
        color: COLOR_CODES.PRIMARY_COLOR,
        fontSize: '18px',
        fontWeight: 700,
        textAlign: 'center'
      }}>
        Confirmation
      </Typography>
      <Typography sx={{
        textAlign: 'center',
        padding: '0 40px'
      }}>
        Are you sure to delete this staff? As deleted,  you can&apos;t undo it
      </Typography>

      <Stack flexDirection='row' justifyContent='center' gap={2} mt={2}>
        <Button 
          label="Close"
          variant='outline'
          onClick={closeDialog}
          style={{ width: '120px', borderRadius: '12px' }}
        />
        <Button 
          label="Confirm"
          onClick={closeDialog}
          style={{ width: '120px', borderRadius: '12px' }}
        />
      </Stack>
    </Stack>
  );
};

export default DeleteStaff;
