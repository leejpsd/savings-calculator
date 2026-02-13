import { Suspense, useState } from 'react';
import { Border, ListRow, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { useSavingsCalculatorForm } from 'hooks/useSavingsCalculatorForm';
import { ErrorBoundary } from 'components/ErrorBoundary';
import SavingsProductContent from 'components/SavingsProductContent';

export function SavingsCalculatorPage() {
  const { goal, monthly, term, goalDisplay, monthlyDisplay, onGoalChange, onMonthlyChange, onTermChange } =
    useSavingsCalculatorForm();
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');

  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={goalDisplay}
        onChange={onGoalChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyDisplay}
        onChange={onMonthlyChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={term} onChange={onTermChange}>
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={v => setActiveTab(v as 'products' | 'results')}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      <Spacing size={12} />

      <ErrorBoundary
        fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 정보를 불러오지 못했습니다." />} />}
      >
        <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="불러오는 중…" />} />}>
          <SavingsProductContent activeTab={activeTab} goal={goal} monthly={monthly} term={term} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
