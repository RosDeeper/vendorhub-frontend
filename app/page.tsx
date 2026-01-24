import Image from 'next/image';
import { Typography, Stack } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/common';
import { SYSTEM_PATHS } from '@/src/constants/path';
import { IMAGES } from '@/components/images';

const X = () => {
  const t = useTranslations('HomePage');

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <Image 
        src={IMAGES.VendorWhiteLogo}
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
        {t('slogan')}
      </Typography>

      <Stack flexDirection='row' gap={25} mt={20}>
        <Link href={`${SYSTEM_PATHS.auth}?type=signup`}>
          <Button 
            label={t('signUp')}
            variant='secondary'
            style={{ width: '160px' }}
          />
        </Link>
        <Link href={`${SYSTEM_PATHS.auth}?type=login`}>
          <Button 
            label={t('signIn')}
            variant='primary'
            style={{ width: '160px' }}
          />
        </Link>
      </Stack>
    </div>
  );
};

export default X;
