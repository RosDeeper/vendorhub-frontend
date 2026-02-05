export const mock = [
  {
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'active',
    createdAt: '2026-02-11T13:18:28.926Z',
  },
  {
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'inactive',
    createdAt: '2026-02-11T13:18:28.926Z',
  },
  {
    name: 'John Michael',
    email: 'micheal@mail.com',
    services: ['Nails', 'Salons'],
    status: 'active',
    createdAt: '',
  },
];

export enum FilterKeys {
  _TITLE = 'productTitle',
  _SKU = 'sku',
  _STOCK_LEVEL = 'stockLevel',
  _CATEGORY = 'category',
  _WAREHOUSE = 'warehouse',
}

export type ProductFilterParams = {
  [FilterKeys._TITLE]: string,
  [FilterKeys._SKU]: string,
  [FilterKeys._STOCK_LEVEL]: number[],
  [FilterKeys._CATEGORY]: string,
  [FilterKeys._WAREHOUSE]: string,
};

export const ProductFilterParamsValues = {
  [FilterKeys._TITLE]: '',
  [FilterKeys._SKU]: '',
  [FilterKeys._STOCK_LEVEL]: [0, 0],
  [FilterKeys._CATEGORY]: '',
  [FilterKeys._WAREHOUSE]: '',
};

