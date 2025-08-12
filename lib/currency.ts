export type Curr = 'cad' | 'usd';

export const formatMoney = (value: number, curr: Curr) =>
  new Intl.NumberFormat(curr === 'cad' ? 'en-CA' : 'en-US', {
    style: 'currency',
    currency: curr.toUpperCase(),
  }).format(value);
