import type { SavingsProduct } from 'types/product';

const SIMPLE_INTEREST_FACTOR = 0.5;
const ROUNDING_UNIT = 1000;

function interestMultiplier(annualRatePct: number) {
  return 1 + (annualRatePct / 100) * SIMPLE_INTEREST_FACTOR;
}

export const finalAmount = (monthly: number, months: number, annualRatePct: number) =>
  monthly * months * interestMultiplier(annualRatePct);

export const diffToGoal = (goal: number, total: number) => goal - total;

export const recommendedMonthly = (goal: number, months: number, annualRatePct: number) => {
  if (!months) {
    return 0;
  }
  const raw = goal / (months * interestMultiplier(annualRatePct));
  return Math.round(raw / ROUNDING_UNIT) * ROUNDING_UNIT;
};

export interface SavingsCalculationResult {
  total: number;
  diff: number;
  recommendedMonthlyAmount: number;
}

export function calcSavingsResult(
  product: SavingsProduct,
  goal: number,
  monthly: number,
  term: number
): SavingsCalculationResult {
  const total = finalAmount(monthly, term, product.annualRate);
  return {
    total,
    diff: diffToGoal(goal, total),
    recommendedMonthlyAmount: recommendedMonthly(goal, term, product.annualRate),
  };
}
