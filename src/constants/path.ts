export const SYS_PATHS = {
  root: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  product: '/product',
  employee: '/employee',
  service: '/service',
  booking: '/booking',
  payment: '/payment',
  voucher: '/voucher',
};

export const SYS_TYPE = {
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
  FORGET_PASSWORD: 'forgot-password',
};

export const OTP_STEP = {
  EMAIL: 'email',
  OTP: 'otp',
  CREATE_PASSWORD: 'create-password',
}

export const PUBLIC_PATHS = [
  SYS_PATHS.root,
  SYS_PATHS.auth,
];
