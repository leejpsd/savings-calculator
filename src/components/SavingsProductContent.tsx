import { ListRow } from 'tosslib';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { useProductSelection } from 'hooks/useProductSelection';
import { SavingsProductRow } from 'components/SavingsProductRow';
import CalculationResult from 'components/CalculationResult';
import type { SavingsProduct } from 'types/product';

interface Props {
  activeTab: 'products' | 'results';
  goal: number;
  monthly: number;
  term: number;
}

function SavingsProductContent({ activeTab, goal, monthly, term }: Props) {
  const { data: products } = useSavingsProducts();
  const { selectedId, selected, filtered, top2, toggleProduct } = useProductSelection(products, monthly, term);

  const contentByTab = {
    products: <ProductList products={filtered} selectedId={selectedId} onToggleProduct={toggleProduct} />,
    results: (
      <CalculationResult
        selected={selected}
        goal={goal}
        monthly={monthly}
        term={term}
        recommended={top2}
        selectedId={selectedId}
        onToggleProduct={toggleProduct}
      />
    ),
  };

  return contentByTab[activeTab];
}

function ProductList({
  products,
  selectedId,
  onToggleProduct,
}: {
  products: SavingsProduct[];
  selectedId: string | null;
  onToggleProduct: (id: string) => void;
}) {
  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 적금 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(p => (
        <SavingsProductRow key={p.id} product={p} isSelected={selectedId === p.id} onToggleProduct={onToggleProduct} />
      ))}
    </>
  );
}

export default SavingsProductContent;
