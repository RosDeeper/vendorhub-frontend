import { Stack } from '@mui/material';
import { Suspense } from 'react';

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const AuthenLayout = ({ children }: Props) => {
  return (
    <Stack position='relative'>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Stack>
  );
}

export default AuthenLayout;
