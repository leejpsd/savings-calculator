export const formatCurrency = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const digits = (s: string) => s.replace(/[^\d]/g, '');
