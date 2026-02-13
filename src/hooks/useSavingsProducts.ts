import { useSuspenseQuery } from '@tanstack/react-query';
import { getSavingsProducts } from 'api/product';
import type { SavingsProduct } from 'types/product';

export function useSavingsProducts() {
  return useSuspenseQuery<SavingsProduct[]>({
    queryKey: ['savings-products'],
    queryFn: getSavingsProducts,
    staleTime: 5 * 60 * 1000,
  });
}
