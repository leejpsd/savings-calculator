import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { digits, formatCurrency } from 'utils/utils';

export function useSavingsCalculatorForm() {
  const [goalRaw, setGoalRaw] = useState(0);
  const [monthlyRaw, setMonthlyRaw] = useState(0);
  const [term, setTerm] = useState<number>(12);

  const goal = useDeferredValue(goalRaw);
  const monthly = useDeferredValue(monthlyRaw);

  const goalDisplay = useMemo(() => (goalRaw ? formatCurrency(goalRaw) : ''), [goalRaw]);
  const monthlyDisplay = useMemo(() => (monthlyRaw ? formatCurrency(monthlyRaw) : ''), [monthlyRaw]);

  const onGoalChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalRaw(Number(digits(e.target.value)) || 0);
  }, []);

  const onMonthlyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyRaw(Number(digits(e.target.value)) || 0);
  }, []);

  const onTermChange = useCallback((v: number) => setTerm(v), []);

  return {
    goal,
    monthly,
    term,
    goalDisplay,
    monthlyDisplay,
    onGoalChange,
    onMonthlyChange,
    onTermChange,
  };
}
