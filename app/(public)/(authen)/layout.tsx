import { Stack } from '@mui/material';
import { Suspense } from 'react';

import { LogoWithSlogan } from '@/src/containers/Authen';

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const AuthenLayout = ({ children }: Props) => {
  return (
    <Stack padding={5} position='relative'>
      <LogoWithSlogan />

      <Stack mt={4} zIndex={10}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Stack>
    </Stack>
  );
}

export default AuthenLayout;
