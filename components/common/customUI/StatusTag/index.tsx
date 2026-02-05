import { Box, Typography } from "@mui/material";

import { StatusType, STATUS_CONFIG } from "./helpers";

type Props = {
  status: StatusType;
};

export const StatusTag = ({ status }: Props) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;
  
  return (
    <Box sx={{
      width: '80px',
      padding: '2px',
      borderRadius: '99px',
      backgroundColor: config.bgColor
    }}>
      <Typography sx={{
        color: config.color,
        fontWeight: 600,
        textAlign: 'center'
      }}>{config.label}</Typography>
    </Box>
  );
};
