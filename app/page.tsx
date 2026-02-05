'use client';

import Image from 'next/image';
import { Typography, Stack } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from "motion/react";


import { Button } from '@/components/common';
import { SYS_PATHS, SYS_TYPE } from '@/src/constants/path';
import { SYS_IMAGES } from '@/components/images';
import { containerVariants, commonMotionProps } from '@/components/common/animation';

const X = () => {
  const t = useTranslations('HomePage');
  
  return (
    <motion.div
      variants={containerVariants}
      {...commonMotionProps}
    >
      <div className='flex flex-col min-h-screen justify-center items-center'>
        <Image 
          src={SYS_IMAGES.VendorWhiteLogo}
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
          <Link href={`${SYS_PATHS.auth}?type=${SYS_TYPE.SIGN_UP}`}>
            <Button 
              label={t('signUp')}
              variant='secondary'
              style={{ width: '160px' }}
            />
          </Link>
          <Link href={`${SYS_PATHS.auth}?type=${SYS_TYPE.LOGIN}`}>
            <Button 
              label={t('signIn')}
              variant='primary'
              style={{ width: '160px' }}
            />
          </Link>
        </Stack>
      </div>
    </motion.div>
  );
};

export default X;
