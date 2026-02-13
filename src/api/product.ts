import { SavingsProduct } from 'types/product';
import { fetchJson } from './http';
export const getSavingsProducts = () => fetchJson<SavingsProduct[]>('/api/savings-products');
