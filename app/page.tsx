import Image from 'next/image';
import { Typography, Stack } from '@mui/material';

import { Button } from '@/components/common';

import './styles.scss';

const X = () => {
  return (
    <div className="background-image">
      <div className='flex flex-col h-full justify-center items-center'>
        <Image 
          src='/assets/vendor-logo.png' 
          alt='vendorHub-logo' 
          width={860}
          height={76}
          objectFit='contain'
        />
        <Typography 
          fontSize={24} 
          color='#fff' 
          fontWeight={500}
          textAlign='center'
          mt='60px'
        >
          Know yourself better
        </Typography>

        <Stack flexDirection='row' gap={25} mt={20}>
          <Button 
            label='Sign Up'
            variant='secondary'
            style={{ width: '160px' }}
          />
          <Button 
            label='Sign In'
            variant='primary'
            style={{ width: '160px' }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default X;
