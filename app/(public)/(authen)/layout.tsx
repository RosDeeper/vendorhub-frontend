import { Stack } from '@mui/material';

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
        {children}
      </Stack>
    </Stack>
  );
}

export default AuthenLayout;
