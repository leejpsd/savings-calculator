# 토스 적금 계산기

> 본 프로젝트는 과거 토스 채용 과제로 진행한 적금 계산기입니다.
> 당시에는 프라이빗으로 관리했으나, 최근 토스에서 [해당 과제를 퍼블릭으로 공개](https://github.com/toss-fe-interview/frontend-accelerator-5th-pre-course)하여 저도 포트폴리오 목적으로 공개합니다.
> 문제가 될 경우 즉시 삭제하겠습니다.

사용자가 목표 금액, 월 납입액, 저축 기간을 입력하면 조건에 맞는 적금 상품을 필터링하고 예상 수익을 계산하는 웹 애플리케이션입니다.

## 실행 방법

```bash
yarn install
yarn dev
# http://localhost:5173
```

## 기술 스택

- React 18, TypeScript, Vite
- Emotion (CSS-in-JS)
- React Query (서버 상태 관리)
- React Router DOM v7
- TossLib 디자인 시스템

## 프로젝트 구조

```
src/
├── api/                          # API 레이어
│   ├── http.ts                   # tosslib HTTP 클라이언트 래퍼
│   └── product.ts                # 적금 상품 API
├── components/                   # UI 컴포넌트
│   ├── CalculationResult.tsx     # 계산 결과 표시
│   ├── ErrorBoundary.tsx         # 에러 바운더리
│   ├── SavingsProductContent.tsx # 탭별 콘텐츠 분기
│   └── SavingsProductRow.tsx     # 상품 행 (공유 컴포넌트)
├── hooks/                        # 커스텀 훅
│   ├── useSavingsCalculatorForm.ts  # 입력 폼 상태 관리
│   ├── useProductSelection.ts       # 상품 선택/필터/추천
│   └── useSavingsProducts.ts        # 상품 목록 데이터 페칭
├── lib/                          # 순수 함수
│   ├── calc.ts                   # 이자 계산 공식
│   └── filter.ts                 # 상품 필터링/정렬
├── pages/
│   ├── SavingsCalculatorPage.tsx  # 메인 페이지
│   └── Routes.tsx                 # 라우팅
├── types/
│   └── product.ts                # SavingsProduct 타입
└── utils/
    └── utils.ts                  # 통화 포맷팅, 숫자 파싱
```

## 설계 결정

### 커스텀 훅을 통한 관심사 분리

페이지 컴포넌트에 집중되어 있던 상태 관리 로직을 역할별 커스텀 훅으로 분리했습니다.

- **useSavingsCalculatorForm** — 사용자 입력(목표 금액, 월 납입액, 저축 기간)과 `useDeferredValue`를 통한 입력 디바운싱
- **useProductSelection** — 필터링 조건에 따른 상품 목록 산출, 선택 상태 관리, 상위 2개 추천 상품 도출
- **calcSavingsResult** — 선택된 상품 기반 수익 계산 (Hook이 아닌 순수 함수로 추출하여 테스트 용이성 확보)

이렇게 분리하면 각 훅과 순수 함수가 단일 책임을 가지며, 페이지 컴포넌트는 UI 조합에만 집중할 수 있습니다.

### 선언적 비동기 처리 (Suspense + ErrorBoundary)

`isLoading` / `isError` 분기를 수동으로 처리하는 대신, React의 `Suspense`와 `ErrorBoundary`를 활용하여 비동기 상태를 선언적으로 처리했습니다.

- `useSuspenseQuery`를 사용하여 데이터가 준비된 후에만 컴포넌트가 렌더링
- 로딩과 에러 상태는 상위 경계 컴포넌트에 위임
- 하위 컴포넌트는 성공 경로만 처리하면 되므로 코드가 단순해짐

### 공유 컴포넌트를 통한 중복 제거

적금 상품 목록과 추천 상품 목록에서 동일한 행 마크업이 반복되고 있었습니다. `SavingsProductRow`를 추출하여 단일 소스로 통합했습니다.

### 명시적 네이밍

- 필터링 조건을 `matchesUserCriteria`로 명명하여 의도를 드러냄
- `onSelect` → `onToggleProduct`로 변경하여 토글 동작을 명시
- 계산 공식의 매직넘버를 `SIMPLE_INTEREST_FACTOR`, `ROUNDING_UNIT` 상수로 추출
