import type { SavingsProduct } from 'types/product';

export function matchesUserCriteria(product: SavingsProduct, monthly: number, term: number) {
  const isWithinAmountRange = monthly > product.minMonthlyAmount && monthly < product.maxMonthlyAmount;
  const isMatchingTerm = term === product.availableTerms;
  return isWithinAmountRange && isMatchingTerm;
}

export function getTopByRate(products: SavingsProduct[], count: number) {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, count);
}
