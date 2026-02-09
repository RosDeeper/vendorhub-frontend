export enum FormKeys {
  _AVATAR_URL = 'avatarUrl',
  _FULL_NAME = 'fullname',
  _WORKING_HOUR = 'workingHour',
  _SERVICES = 'services',
  _STATUS = 'status',
};

export type AddStaffFormValues = {
  [FormKeys._AVATAR_URL]: string;
  [FormKeys._FULL_NAME]: string;
  [FormKeys._WORKING_HOUR]: string[];
  [FormKeys._SERVICES]: string[];
  [FormKeys._STATUS]: string;
};

export const initialFormValues = {
  [FormKeys._AVATAR_URL]: '',
  [FormKeys._FULL_NAME]: '',
  [FormKeys._WORKING_HOUR]: [],
  [FormKeys._SERVICES]: [],
  [FormKeys._STATUS]: '',
};
