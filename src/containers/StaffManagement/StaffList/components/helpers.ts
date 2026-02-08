export const mock = [
  {
    id: '12',
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'active',
    createdAt: '2026-02-11T13:18:28.926Z',
  },
  {
    id: '13',
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'inactive',
    createdAt: '2026-02-11T13:18:28.926Z',
  },
  {
    id: '14',
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'active',
    createdAt: '',
  },
];

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

