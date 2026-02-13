import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatCurrency } from 'utils/utils';
import { calcSavingsResult } from 'lib/calc';
import { SavingsProductRow } from 'components/SavingsProductRow';
import type { SavingsProduct } from 'types/product';

interface Props {
  selected: SavingsProduct | null;
  goal: number;
  monthly: number;
  term: number;
  recommended: SavingsProduct[];
  selectedId: string | null;
  onToggleProduct: (id: string) => void;
}

function CalculationResult({ selected, goal, monthly, term, recommended, selectedId, onToggleProduct }: Props) {
  if (!selected) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const { total, diff, recommendedMonthlyAmount } = calcSavingsResult(selected, goal, monthly, term);

  return (
    <>
      <Spacing size={8} />
      <CalculationRow label="예상 수익 금액" value={`${formatCurrency(total)}원`} />
      <CalculationRow label="목표 금액과의 차이" value={`${diff >= 0 ? '' : '-'}${formatCurrency(Math.abs(diff))}원`} />
      <CalculationRow label="추천 월 납입 금액" value={`${formatCurrency(recommendedMonthlyAmount)}원`} />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommended.map(p => (
        <SavingsProductRow key={p.id} product={p} isSelected={selectedId === p.id} onToggleProduct={onToggleProduct} />
      ))}

      <Spacing size={40} />
    </>
  );
}

function CalculationRow({ label, value }: { label: string; value: string }) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={label}
          topProps={{ color: colors.grey600 }}
          bottom={value}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
}

export default CalculationResult;
