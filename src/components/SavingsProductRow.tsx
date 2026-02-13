import { Assets, colors, ListRow } from 'tosslib';
import { formatCurrency } from 'utils/utils';
import type { SavingsProduct } from 'types/product';

interface Props {
  product: SavingsProduct;
  isSelected: boolean;
  onToggleProduct: (id: string) => void;
}

export function SavingsProductRow({ product, isSelected, onToggleProduct }: Props) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${product.annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${formatCurrency(product.minMonthlyAmount)}원 ~ ${formatCurrency(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={() => onToggleProduct(product.id)}
    />
  );
}
