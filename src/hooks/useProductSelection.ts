import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SavingsProduct } from 'types/product';
import { matchesUserCriteria, getTopByRate } from 'lib/filter';

const TOP_RECOMMENDATION_COUNT = 2;

export function useProductSelection(products: SavingsProduct[], monthly: number, term: number) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => products.filter(p => matchesUserCriteria(p, monthly, term)),
    [products, monthly, term]
  );

  const selected = useMemo(() => products.find(p => p.id === selectedId) ?? null, [products, selectedId]);

  const top2 = useMemo(() => getTopByRate(filtered, TOP_RECOMMENDATION_COUNT), [filtered]);

  useEffect(() => {
    if (selectedId && !filtered.some(p => p.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  const toggleProduct = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  return { selectedId, selected, filtered, top2, toggleProduct };
}
