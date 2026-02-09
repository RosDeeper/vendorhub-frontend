export enum FilterKeys {
  _STATUS = 'status',
  _SERVICES = 'services',
  _WEEK_DAY = 'weekday',
  _START_TIME = 'startTime',
  _END_TIME = 'endTime',
}

export type ProductFilterParams = {
  [FilterKeys._STATUS]: string,
  [FilterKeys._SERVICES]: string[],
  [FilterKeys._WEEK_DAY]: string,
  [FilterKeys._START_TIME]: string,
  [FilterKeys._END_TIME]: string,
};

export const ProductFilterParamsValues = {
  [FilterKeys._STATUS]: '',
  [FilterKeys._SERVICES]: [],
  [FilterKeys._WEEK_DAY]: '',
  [FilterKeys._START_TIME]: '',
  [FilterKeys._END_TIME]: '',
};
