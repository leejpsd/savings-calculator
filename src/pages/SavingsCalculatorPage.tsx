import { Suspense } from 'react';
import { Border, colors, ListRow, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { useSavingsProducts } from 'hooks/useSavingsProducts';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { formatCurrency } from 'utils/utils';

export function SavingsCalculatorPage() {
  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />

      <TextField label="목표 금액" placeholder="목표 금액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <TextField label="월 납입액" placeholder="희망 월 납입액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={12} onChange={() => {}}>
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={() => {}}>
        <Tab.Item value="products" selected={true}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={false}>
          계산 결과
        </Tab.Item>
      </Tab>

      <Spacing size={12} />

      <ErrorBoundary
        fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 정보를 불러오지 못했습니다." />} />}
      >
        <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="불러오는 중…" />} />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function ProductList() {
  const { data: products } = useSavingsProducts();

  return (
    <>
      {products.map(p => (
        <ListRow
          key={p.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={p.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${p.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${formatCurrency(p.minMonthlyAmount)}원 ~ ${formatCurrency(p.maxMonthlyAmount)}원 | ${p.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
        />
      ))}
    </>
  );
}
