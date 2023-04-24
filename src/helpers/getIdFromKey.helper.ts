export const getIdFromKey = (key: string): string => {
  let res = key;

  if (key.includes(`#`)) {
    res = key.split(`#`)[1];
  }

  return res;
};
