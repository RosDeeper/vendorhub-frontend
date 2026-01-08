"use client";

import { Stack, Typography } from "@mui/material";

import { Separator } from "./lib-ui";

type Props = {
  text?: string;
  orientation?: "horizontal" | "vertical";
};

const Divider = ({ text, orientation = 'horizontal' }: Props) => {
  return (
    text ? (
      <Stack direction='row' alignItems='center' justifyContent='center'>
        <Separator className="flex-1 h-0.5 max-w-40" />
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
        <Separator className="flex-1 h-0.5 max-w-40" />
      </Stack>
    ) : (
      <Separator orientation={orientation} />
    )
  );
};

export { Divider };
