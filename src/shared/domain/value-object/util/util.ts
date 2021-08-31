export const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const shuffle = <T>(arr: T[]): T[] =>
  arr.sort(() => Math.random() - 0.5);

export const getFileNameFromUrl = (url: string): string =>
  url.substring(url.lastIndexOf('/') + 1);
