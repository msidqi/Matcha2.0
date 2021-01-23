export const indexOf = <T>(array: T[], cb: (elem: T) => boolean): number => {
  for (let i = 0; i < array.length; i++) if (cb(array[i])) return i;
  return -1;
};
