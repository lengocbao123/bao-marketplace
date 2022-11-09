export const formatCurrency = (number?: number | null, maximumFractionDigits = 6, locale?: string): string => {
  if (!number) {
    return '-';
  }

  return number.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: 0,
  });
};

export const formatPercentage = (number?: number | null, locale?: string): string => {
  if (!number) {
    return '-';
  }

  return number.toLocaleString(locale, { style: 'percent', maximumFractionDigits: 1 });
};

export const formatNumber = (number?: number | null, locale?: string): string => {
  if (!number) {
    return '-';
  }

  return number.toLocaleString(locale);
};

export const formatAbbreviationNumber = (number?: number | null, locale?: string): string => {
  if (!number) {
    return '-';
  }

  const formatter = Intl.NumberFormat(locale, {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
};
