import { Stack, Typography } from "@mui/material";

import { Separator } from "./lib-ui";

type Props = {
  text?: string;
  bgColor?: string;
  orientation?: "horizontal" | "vertical";
};

const Divider = ({ text, orientation = 'horizontal', bgColor = '#000' }: Props) => {
  return (
    text ? (
      <Stack direction='row' alignItems='center' justifyContent='center'>
        <Separator 
          className="flex-1 h-0.5 max-w-40"
          style={{ backgroundColor: bgColor }}
        />
        <Typography
          sx={{
            border: '2px solid #000',
            padding: '0px 2px',
            height: 'fit-content',
            fontWeight: 600
          }}
        >
          {text}
        </Typography>
        <Separator 
          className="flex-1 h-0.5 max-w-40"
          style={{ backgroundColor: bgColor }}
        />
      </Stack>
    ) : (
      <Separator 
        orientation={orientation}
        style={{ backgroundColor: bgColor }}
      />
    )
  );
};

export { Divider };
