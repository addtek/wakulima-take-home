// Helper methods to deal with presenting dates.

// Formats as 9/24/2020
export const formattedShortDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-us');
};

// Formats as Sep 24, 2020
export const formattedLongDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Formats as Sep 24, 2020 4:47 AM
export const formattedDateTime = (date: Date, isLong = true): string => {
  return date.toLocaleDateString('en-US', {
    month: isLong ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const minimumDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 2);
  return date;
};

export const maxDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  return date;
};
